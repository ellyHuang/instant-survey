const mongoose = require('mongoose');
const requireLogin = require('../middlewars/requireLogin');
const verifyCredits = require('../middlewars/verifyCredit');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('Surveys');

module.exports = (app) => {
    app.post(
        '/api/surveys',requireLogin, verifyCredits, async(req, res) => {
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
    )

    app.get('/api/surveys/responded', (req, res) => {
        res.send('Thanks for your feedback! ');
    })
}