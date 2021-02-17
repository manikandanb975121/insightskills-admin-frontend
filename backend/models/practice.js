const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Image = require('../models/image');

const practiceSchema = mongoose.Schema({
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Questions', required: true },
    topic: { type: String, required: true },
    message: { type: String, required: true},
    difficulty: { type: String, required: true},
    solution: { type: String, required: true },
    image: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],
    status: {type: String, default: 'Unsolved'}
});

module.exports = mongoose.model('Practice', practiceSchema);