const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const resultSchema = new mongoose.Schema({
    survey: { 
        type: String,
        /* type: ObjectId  */
       /*  auto : true, */
        required:true, 
        ref: 'Survey' 
    },
    question: {
        type: String,
      /*   auto : true, */
        required: true
    },
    choices:[{
        type: String,
      /*   auto : true, */
        required: true
    }],
    created_at: { 
        type: Date, 
        default: Date.now 
    }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;