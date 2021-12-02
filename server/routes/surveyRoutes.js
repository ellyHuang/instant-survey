const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewars/requireLogin');
const verifyCredits = require('../middlewars/verifyCredit');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('Surveys');

module.exports = (app) => {
    app.post('/api/surveys', requireLogin, verifyCredits, async(req, res) => {
            const {title, subject, body, recipients} = req.body;

            const survey = new Survey({
                title,
                subject,
                body, 
                recipients: recipients.split(',').map( email => ({ email: email.trim() }) ),
                _user: req.user.id,
                dateSent: Date.now(),
            });

            //send out the survey via sendGrid
            const mailer = new Mailer(survey, surveyTemplate(survey));

            try{
                await mailer.send();
                await survey.save();

                req.user.credits -= 1;
                const user = await req.user.save();

                res.send(user);

            }catch(err){
                res.status(422).send(err);
            }
        }
    );

    app.get('/api/surveys/:surveyId/:feedback', (req, res) => {
        res.send('Thanks for your feedback! ');
    });

    app.post('/api/surveys/webhooks', async(req, res) => {
        //feedback process pipline
        const feedbacks = new Path('/api/surveys/:surveyId/:feedback');
        _.chain(req.body)
            .map(({email, url}) => {
                const validPath = feedbacks.test(new URL(url).pathname);

                if (validPath) {
                    return { email, surveyId: validPath.surveyId, feedback: validPath.feedback };
                };
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each( ({email, surveyId, feedback}) => {
                //update the record in mongoDB
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }}
                },{
                    $inc: { [feedback]: 1 },
                    $set: { 'recipients.$.responded': true},
                    lastResponded: new Date()
                }).exec();
            })
            .value();

        res.send({});
    });

    app.get('/api/surveys', requireLogin, async(req, res) => {
        const allSurveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });

        res.send(allSurveys);
    });
}