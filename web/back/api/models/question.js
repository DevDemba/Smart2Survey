const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type:String,
        required: true
    },
    multi: {
        type:Boolean,
        default:true
    },
    imageUrl: String,
    choices: [
        {
            text: {
                type:String,
                required: true
            },
            imageUrl: String
        }
    ]
});

const  Question = mongoose.model('Results', questionSchema);

module.exports =  Question;


 