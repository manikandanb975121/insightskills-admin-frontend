const mongoose = require('mongoose');

const notification = new mongoose.Schema({
    title: { type: String, required: true },
    createdDate: { type: String, required: true},
    content: { type: String, required: true},
    links: [
        { type: String, required: true }
    ]
});


module.exports = mongoose.model('Notifications', notification);