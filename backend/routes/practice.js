const express = require('express');
const mongoose = require('mongoose');
const app = require('../app');
const upload = require('../middleware/upload');
const fs = require('fs');

var base64ToImage = require('base64-to-image');

const checkAuth = require('../middleware/check-auth');
const Practice = require('../models/practice');

const router = express.Router();
const Image = require('../models/image');

// router.post('', checkAuth, (req, res, next) => {
//     console.log(req.body);
//     const practice = new Practice({
//         question: req.body.questionId,
//         title: req.body.topicTitle 
//     });
//     practice.save().then(document => {
//         // console.log(document)
//         res.status(200).json({
//             message: 'Practice Question Created Successfully',
//             result: document
//         });
//     });
//     // next();
// });


router.post('',checkAuth, async function(req,res,next){

    // console.log(req.body);

    // var base64Str = req.body.image[0];
    // var path = '';
    // var optionalObj = {'fileName': 'imageFileName', 'type':'png'};

    // var imageInfo = base64ToImage(base64Str,path,optionalObj); 

    // console.log(req.files);
    
    try{
        console.log(req.body);
        await upload(req, res);
        console.log(req.files);
        const url = req.protocol + '://' + req.get('host');
        const imagePathArray = new Array();
        const imageArrayCount = 2
        for(let i = 0; i < req.files.length; i++){
            console.log(req.files[i]);
            await Image.create({image: url+ '/learnModuleImages/' + req.files[i].filename}).then(imageId => {            
                imagePathArray.push(imageId._id)
            })
        }
        await Practice.create(req.body).then(practiceQuestions => {
            practiceQuestions.image = imagePathArray
            practiceQuestions.save();
            res.status(201).json({
                message: "Question posted successful"
                });
            console.log(practiceQuestions);
        })
    }catch(error){
        console.log(error);
        console.log("Sorry... Request cannot be processed. Try again later!!!")
        res.status(400).json("Sorry... Request cannot be processed. Try again later!!!")
    }
})



router.get('', checkAuth, (req, res, next) => {
    Practice.find()
    .populate('question')
    .populate('image')
    .then(document => {
        console.log(document);
            res.status(200).json({
                message: 'Practice Questions Fetched Successfully',
                result: document
            })
    });
});

router.delete('/:id', checkAuth, (req, res, next) => {
    console.log(req.params.id);
    Practice.deleteOne({ _id: req.params.id}).then(document => {
        console.log(document);
        res.status(200).json({
            message: 'Practice Questions Deleted Successfully!'
        })
    });
});


router.get('/:id', checkAuth, (req, res, next) => {
    Practice.findById(req.params.id)
        .populate('question')
        .populate('image')
        .then(doc => {
            res.status(201).json({
                message: 'Fetched successfully',
                result: doc
            })
        })
});

module.exports = router;