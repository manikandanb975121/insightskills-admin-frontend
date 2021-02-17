const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Topic = require('../models/topic');
const Questions = require('../models/questions');

const checkAuth = require('../middleware/check-auth');


router.post('', checkAuth, (req, res, next) => {
    const topic = new Topic({
        title: req.body.title,
        descriptions: req.body.descriptions,
        adminEnable: req.body.adminEnable,
        collegeEnable: req.body.collegeEnable
    });
    topic.save().then(createdTopic => {
        console.log(topic);
        res.status(201).json({
            message: 'Post Added Successfully !',
            topicId: createdTopic._id
        });
    });
});

router.get('', checkAuth, (req, res, next) => {
    Topic.find()
    .populate('questions')
    .then(documents => {
        res.status(200).json({
            message: 'Topics fetched successfully',
            topics: documents
        });
    });
});

router.get('/:id', checkAuth, (req, res, next) => {
    //console.log(req.params.id);
    Topic.findById({ _id: req.params.id})
    .populate('questions')
    .then((result) => {
    console.log(result);
        //console.log(result.questions);
        res.status(200).json({
            message: 'Topic Fetched Successfully',
            topics: result
        })
    })
});

router.post('/:id', checkAuth, (req, res, next) => {
    // console.log(req.params.id); 
    // console.log(req.body.title);  
    const question = new Questions({
        title: req.body.title, 
        optA: req.body.optA, 
        optB: req.body.optB, 
        optC: req.body.optC, 
        optD: req.body.optD, 
        ans: req.body.ans,
        topicId: req.params.id
    });
    question.save().then((question) => {
        console.log(question);
        Topic.findByIdAndUpdate({_id: req.params.id}).then((topic) => {
            topic.questions.push(question._id);
            topic.save().then(document => {
                res.status(200).json({
                    message: 'Questions Added Successfully',
                    question: question
                });
            })
        })
    });
    // Topic.findByIdAndUpdate({_id: req.params.id}).then((result) => {
    //     console.log(result.questions.length);

    //     const question = new Questions({
    //         title: req.body.title, optA: req.body.optA, optB: req.body.optB, optC: req.body.optC, optD: req.body.optD, ans: req.body.ans
    //     });
    //     question.save().then((createdQuestions) => {
    //         console.log(createdQuestions);
    //         result.questions.push(createdQuestions);
    //         result.save().then(topic => {
    //         console.log('topic');
    //         res.status(200).json({
    //             message: 'Question Added Successfully!',
    //             question: result.questions
    //         });
    //     });
    //     }); 
    // });
});

router.delete('/:id', checkAuth, (req, res, next) => {
    Topic.deleteOne({ _id: req.params.id}).then((result) => {
        console.log(result);
        res.status(200).json({
            message: 'Post Deleted!'
        });
    });
});

router.delete('/:id/:questionId', checkAuth, (req, res, next) => {
    console.log(req.params.id);
    console.log(req.params.questionId);
    Questions.deleteOne({_id: req.params.questionId}).then((result) => {
        console.log(result);
    });
    Topic.findByIdAndUpdate({_id: req.params.id}, ).then((result) => {
        console.log(result);
        result.questions.pull({ _id: req.params.questionId})
        result.save();
        console.log(result);
    });
});

router.put('/:id', checkAuth, (req, res, next) => {
    console.log(req.params.id);
    console.log(req.body.adminEnable);
    Topic.updateOne({_id: req.params.id}, {adminEnable: req.body.adminEnable}).then(result => {
        res.status(200).json({message :'updated Successfully'});
    });
});
module.exports = router;