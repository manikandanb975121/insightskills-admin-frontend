const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create testScore Schema & Models to store student's test score
const testScoreSchema = new Schema({
    studentId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    aTest: [{
        testId: {type: mongoose.Schema.Types.ObjectId, ref: 'CompletedAdminTest'},
        aTest: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminTest'},
        score: Number,
        startTime: Date,
        closeTime: Date,
        maxMark: Number
    }],
    cTest: [{
        testId: {type: mongoose.Schema.Types.ObjectId, ref: 'CompletedCollegeTest'},
        cTest: { type: mongoose.Schema.Types.ObjectId, ref: 'CollegeTest' },
        score: Number,
        startTime: Date,
        closeTime: Date,
        maxMark: Number
    }]
})

module.exports = mongoose.model("TestScore", testScoreSchema);