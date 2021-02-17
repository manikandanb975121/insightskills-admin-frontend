const express = require('express');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();
const AdminCustomizedQuestions = require('../models/adminCustomizedQuestions');
const Questions = require('../models/questions');
const CollegeQuestions = require('../models/collegeTest');


router.post('', checkAuth, (req, res, next) => {
    // console.log(req.body.title);
    // console.log(req.body.questionsIds);
    const admincustomizedQuestion = new AdminCustomizedQuestions({
        title: req.body.title,
        durations: req.body.durations,
        questionID: req.body.questionsIds,
        maxmark: req.body.maxMark,
        status: req.body.status,
        type: req.body.type,
        adminId: req.userData.userId,
        startDate: '',
        endDate: ''
    });
    console.log(admincustomizedQuestion);
    admincustomizedQuestion.save().then(createCustomizedQuestion => {
        res.status(200).json({
            message: 'Question Posted Successfully',
            test: createCustomizedQuestion
        });
    });
});

router.get('', checkAuth, (req, res, next) => {
    AdminCustomizedQuestions.find()
    // .populate('questionID')
    // .exec()
    .populate({
        path: 'questionID.questionsId',
        // populate: {
        //     path: 'questionsId',
        //     model: 'Questions'
        // }
        model: 'Questions'
    })
    // .exec()
    .then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'Topics fetched successfully',
            topics: documents
        });
    });
});

router.delete('/:id', checkAuth, (req, res, next) => {
    AdminCustomizedQuestions.deleteOne({ _id: req.params.id}).then((result) => {
        console.log(result);
        res.status(200).json({
            message: 'Post Deleted'
        })
    });
    // CollegeQuestions.deleteOne({ collegeID: req.userData.userId}).then( (result) => {
    //     console.log('deleted');
    // });
});

module.exports = router;