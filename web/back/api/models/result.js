const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    survey: { 
        type: Schema.ObjectId, 
        required:true, ref: 'Survey' 
    },
    question: {
        type:Schema.ObjectId,
        required: true
    },
    choices:[{
        type:Schema.ObjectId,
        required: true
    }],
    created_at: { 
        type: Date, 
        default: Date.now 
    }
});

const Result = mongoose.model('Results', resultSchema);

module.exports =  Result;