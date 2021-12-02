const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [RecipientSchema],
    positive: {type: Number, default:0},
    negative: {type: Number, default:0},
    _user: {type: Schema.Types.ObjectId, ref: 'Users'},
    dateSent: Date,
    lastResponded: Date,

});

mongoose.model('Surveys', surveySchema);