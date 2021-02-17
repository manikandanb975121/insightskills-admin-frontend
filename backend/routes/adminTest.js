const express = require('express');
const async = require('async');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();
const AdminTest = require('../models/adminTest');
const CustomizedTest = require('../models/adminCustomizedQuestions');
const Test = require('../models/atest');
const students = require('../models/student');
// const College = require('../models/college');
// const CustomizedQuestion = require('../models/customizedQuestion');
// const Questions = require('../models/questions');

router.get('', checkAuth, (req, res, next) => {
   AdminTest.find()
   .populate({
       path: 'test',
       model: 'AdminCustomizedQuestions',
       populate: {
           path: 'questionID',
        //    model: 'CustomizedQuestions'
       }
   })
   .exec()
   .then(documents => {
        res.status(200).json({
            message: 'fetched',
            test: documents
        })
   });
//    .populate('test')
// //    .populate('questionID')
//    .exec()
//    .then((documents) => {
//     //    res.status(200).json({
//     //        message: 'Test fetched Successfully',
//     //        test: documents
//     //    });
//     // documents.populate('questionID')
//     async.forEach(documents, (item) => {
//         console.log(item.test.populate('questionID'));
//         // CustomizedQuestion.populate(item.test.questionID).exec().then(response => {
//         //     console.log(response);
//         // })
//     });
    
//    });
});

router.post('', checkAuth, (req, res, next) => {
    const test = new AdminTest({
        test: req.body.test,
        adminId: req.userData.userId
    });
    console.log(test);
    test.save().then(documents => {
        res.status(200).json({
            message: 'Test Posted Successfully',
            test: documents
        });
    });
});

router.post('/start', checkAuth, (req,res,next) => {
    const test = new Test({
        test: req.body.test,
        // durations: req.body.durations,
        creatorId: req.userData.userId
    });
    test.save().then(documents => {
        res.status(200).json({
            message: 'Test Started Successfully',
            test: documents
        });
    });
});

router.delete('/stop/:id', checkAuth, (req,res,next) => {
    // const test = new Test({
    //     test: req.body.test,
    //     // durations: req.body.durations,
    //     adminId: req.userData.userId
    // });
    // test.save().then(documents => {
    //     res.status(200).json({
    //         message: 'Test Started Successfully',
    //         test: documents
    //     });
    // });
    console.log(req.params.id);
    Test.deleteOne({test: req.params.id}).then(document => {
        res.status(200).json({
            message: 'Test Stoped',
            response: document
        })
    })
});


router.delete('/:id', checkAuth, (req, res, next) => {
    console.log(req.params.id);
    AdminTest.deleteOne({ _id: req.params.id}).then(documents => {
        res.status(200).json({
            message: 'Test has been deleted',
        });
    });
});

router.post('/status', checkAuth, (req, res, next) => {
    console.log(req.body.status); 
    console.log(req.body.id);
    CustomizedTest.update({ _id: req.body.id}, 
        { $set: { 'status': req.body.status}}).then(result => {
            console.log(result);
        }); 
});

router.post('/date', checkAuth, (req, res, next) => {
    // console.log(req.body.status); 
    console.log(req.body.id);
    CustomizedTest.update({ _id: req.body.id}, 
        { $set: { 'startDate': req.body.startDate, 'endDate': req.body.endDate }}).then(result => {
            console.log(result);
        }); 
});


router.get('/:id', checkAuth, (req, res, next) => {
    console.log(req.params.id);
    AdminTest.findById({ _id: req.params.id})
    .populate({
        path: 'test',
        model: 'AdminCustomizedQuestions',
        populate: {
            path: 'questionID.questionsId',
            model: 'Questions'
        },
    })
    .populate({
        path: 'students',
        model: 'Student',
        populate: {
            path: 'college'
        }
        // populate: {
        //     path: 'college',
        //     model: 'College'
        // }
    })
    .exec()
    .then((response) => {
        console.log(response);
        res.status(200).json({
            message: 'Test Details Fetched Successfully',
            result: response
        })
    });
});

router.post('/addStudents', (req, res, next) => {
    console.log(req.body);
    AdminTest.findById({_id: req.body.id}).then(response => {
        console.log(response);
        console.log(response.students)
        response.students.push(req.body.studentId);
        response.save();
    })
    res.status(200).json({
        message: 'Student Added!'
    })
}); 


module.exports = router;