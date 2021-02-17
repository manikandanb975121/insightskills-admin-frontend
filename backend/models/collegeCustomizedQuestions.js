const mongoose = require('mongoose');




const customizedQuestions = mongoose.Schema({
    title: {type: String, required: true},
    questionID: [
        {
            questionsId: {type: mongoose.Schema.Types.ObjectId, ref: 'Questions', required: true} ,
            score: {type: Number, require: true}
        }
    ],
    collegeQuestionID: [
        {
            questionsId: {type: mongoose.Schema.Types.ObjectId, ref: 'CollegeQuestions', required: true},
            score: {type: Number, require: true}
        }
    ],
    maxmark : { type: Number, required: true},
    durations : { type: Number, required: true },
    status: { type: String, required: true},
    startDate: {type: String},
    endDate: {type: String},
    highestScore: {type: Number, default: 0},
    averageScore: {type: Number, default: 0},
    leastScore: {type: Number, default: 99999},
    collegeID: {type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true}
});

module.exports = mongoose.model('customizedQuestions', customizedQuestions);