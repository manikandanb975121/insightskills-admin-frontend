const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const Notification = require('../models/notifications');

router.post('', checkAuth, (req, res, next) => {
    const notification = new Notification({
        title: req.body.title,
        createdDate: req.body.createdDate,
        content: req.body.content,
        links: req.body.links
    })
    notification.save()
        .then(doc => {
            res.status(201).json({
                message: 'Notification Posted Successfully',
                result: doc
            })
        });
});

router.get('', checkAuth, (req, res, next) => {
    Notification.find().then(doc => {
        res.status(201).json({
            message: 'Notification Fetched Successfully',
            result: doc
        });
    });
});

router.delete('/:id', checkAuth, (req, res, next) => {
    Notification.deleteOne({ _id: req.params.id}).then(doc => {
        console.log(doc);
    })
});

module.exports = router;