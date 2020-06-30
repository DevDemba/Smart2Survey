const mongoose = require('mongoose');
const questionSchema = require('./question').schema;

const surveySchema = new mongoose.Schema({
    name:  {
        type:String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        required:true,
        ref: 'User'
    },
    questionnaires:[ 
        questionSchema 
    ],
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date,
        default: Date.now 
    }
});

const Survey = mongoose.model('Surveys', surveySchema);

module.exports = Survey;