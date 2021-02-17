const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const College = require('../models/college');

const checkAuth = require('../middleware/check-auth');

const CollegeTest = require('../models/collegeTest');
const CustomizedTest = require('../models/collegeCustomizedQuestions');
const Test = require('../models/atest');
const CTest = require('../models/ctest');
const CollegeQuestions = require('../models/collegeQuestions');


router.post('/create', checkAuth, (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const college = new College({
            collegeName: req.body.collegeName,
            placementCordinatorName: req.body.PlacementCordinatorName,
            email: req.body.email,
            phoneNumber: req.body.placementPhoneNumber,
            password: hash
        });
        college.save()
        .then(result => {
            res.status(201).json({
                message: 'User Created',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
    });
});

router.get('', checkAuth, (req, res, next) => {
    College.find().
    populate('students')
    .then(document => {
        res.status(200).json({
            message: 'College Fetched Successfully',
            college: document
        })
    })
});

router.get('/:id', checkAuth, (req, res, next) => {
    // console.log(req.params.id);
    College.findById({ _id: req.params.id})
    .populate('students')
    .then((document) => {
        console.log(document);
        res.status(200).json({
            message: 'College Details Fetched',
            result: document 
        })
    });
});

router.get('/test/:id', checkAuth, (req, res, next) => {
    console.log('college Id: ', req.params.id);
    CollegeTest.find({collegeId: req.params.id})
    .populate({
        path: 'test',
        model: 'customizedQuestions',
        populate: {
            path: 'questionID.questionsId',
            model: 'Questions'
        }
    })
    .populate({
        path: 'test',
        model: 'customizedQuestions',
        populate: {
            path: 'collegeQuestionID.questionsId',
            model: 'CollegeQuestions'
        }
    })
    .populate({
        path: 'students',
        model: 'Student'
    })
    .then(doc => {
        res.status(200).json({
            message: 'CollegeDetails fetched',
            document: doc
        })
    });
});

router.get('/onlineTest/:id', checkAuth, (req, res, next) => {
    console.log(req.params.id);
    CTest.find({ creatorId: req.params.id})
    .populate({
        path: 'test',
        model: 'CollegeTest',
        populate: {
            path: 'students',
            model: 'Student'
        }
    })
    .populate({
        path: 'test',
        model: 'CollegeTest',
        populate: {
            path: 'test',
            model: 'customizedQuestions',
            populate: {
                path: 'questionID.questionsId',
                model: 'Questions'   
            }
            // populate: {
            //     path: 'questionID',
            //     // populate: {
            //     //     path: 'questionsId',
            //     //     model: 'Questions'
            //     // },
            //     // 
            //     model: 'Questions'
            // }
        }
    })
    .populate({
        path: 'test',
        model: 'CollegeTest',
        populate: {
            path: 'test',
            model: 'customizedQuestions',
            populate: {
                path: 'collegeQuestionID.questionsId',
                model: 'CollegeQuestions'   
            } 
            // populate: {
            //     path: 'questionID',
            //     // populate: {
            //     //     path: 'questionsId',
            //     //     model: 'Questions'
            //     // },
            //     // 
            //     model: 'Questions'
            // }
        }
    })
    .then(doc => {
        console.log(doc);
        res.status(200).json({
            message: 'Online test',
            document: doc
        })
    });
});
module.exports = router;