const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router =  express.Router();


const Admin = require('../models/user');

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const admin = new Admin({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: hash
        });
        admin.save()
        .then(result => {
            res.status(201).json({
                message: 'Admin Created',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    });
});


router.post('/login', (req, res, next) => {
    let fetchUser;
    Admin.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({
                message: 'Auth Failed !'
            });
        }
        fetchUser = user;
        return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: 'Auth Failed!'
            });
        }
        const token = jwt.sign({email: fetchUser.email, userId: fetchUser._id },
            'secret_this_should_be_longer',
            { expiresIn: '1h'}
        );
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchUser._id
        });
    })
    .catch(err => {
        return res.status(401).json({
            message: 'Auth Failed !'
        });
    });
});

router.get('/:id', (req, res, next) => {
    // console.log(req.params.id);
    Admin.findById({_id: req.params.id}).then((user) => {
        // console.log(user);
        res.status(200).json({
            message: 'User Fetched Successfully',
            user: user
        });
    });

});

module.exports = router;