const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const College = require('../models/college');

const Student = require('../models/student');

const checkAuth = require('../middleware/check-auth');

const TestScore = require('../models/testScore');
const CompletedAdminTest = require('../models/completedAdminTest');
const CompletedCollegeTest = require('../models/completedCollegeTest');

router.post('/create', checkAuth, (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const student = new Student({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mailId: req.body.mailId,
            password: hash,
            college: req.body.collegeId,
            contact: req.body.contact,
            degree: req.body.degree,
            department: req.body.department,
            profilePicture: '',
            graduatingYear: req.body.graduatingYear,
        });
        student.save()
        .then(result => {
            College.findById({ _id: req.body.collegeId}).then(college => {
                console.log(college);
                college.students.push(result._id);
                college.save();

            });
            res.status(201).json({
                message: 'Student Created',
                result: result
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });
});


router.get('/:id', checkAuth, (req, res, next) => {
    Student.findById(req.params.id).then(document => {
        res.status(201).json({
            message: 'Student Fetched Successfully',
            result: document
        });
    });
});

router.get('/test/:id', checkAuth, (req, res, next) => {
    TestScore.find({ studentId: req.params.id})
    .populate({
        path: 'aTest.testId',
        model: 'CompletedAdminTest'
    })
    .populate({
        path: 'cTest.testId',
        model: 'CompletedCollegeTest'
    })
    .then(test => {
            console.log(test);
            res.status(201).json({
                message: 'Test Fetched Successfully',
                result: test
            })
        });
})

router.get('/cTest/:id', checkAuth, (req, res, next) => {
    TestScore.find({ studentId: req.params.id})
    .populate({
        path: 'cTest.testId',
        model: 'CompletedCollegeTest'
    })
    .then(test => {
        console.log(test);
        res.status(201).json({
            message: 'College Test Fetched Successfully',
            result: test
        });
    })
});
module.exports = router;