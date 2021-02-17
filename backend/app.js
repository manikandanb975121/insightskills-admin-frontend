const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Topic = require('./models/topic');
const path = require('path')

const topicsRoutes = require('./routes/topics');
const practiceRoutes = require('./routes/practice');
const userRoutes = require('./routes/user');
const customizedQuestion = require('./routes/adminCustomizedQuestions');
const adminTest = require('./routes/adminTest');
const college = require('./routes/college');
const student = require('./routes/student');
const collegeTest = require('./routes/collegeTest');
const notifications = require('./routes/notification');

const app = express();

mongoose.connect('mongodb+srv://ManikandanB:OgzwjscbQzdgmt3d@cluster0-yjvaj.mongodb.net/Admin-Dashboard?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true})
.then(() => {
    console.log('Connected to database!');
})
.catch(() => {
    console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/learnModuleImages', express.static(path.join('backend/learnModuleImages')));

app.use('/api/topics',topicsRoutes);
app.use('/api/practice', practiceRoutes);
app.use('/api/user', userRoutes);
app.use('/api/create/customizedTest', customizedQuestion);
app.use('/api/test', adminTest);
app.use('/api/college', college);
app.use('/api/student', student);
app.use('/api/notification', notifications)

// app.post('/api/topics', (req, res, next) => {
//     const topic = new Topic({
//         title: req.body.title
//     });
//     topic.save().then(createdTopic => {
//         console.log(topic);
//         res.status(201).json({
//             message: 'Post Added Successfully !',
//             topicId: createdTopic._id
//         });
//     });
// });

// app.get('/api/topics',(req, res, next) => {
//     Topic.find().then(documents => {
//         res.status(200).json({
//             message: 'Topics fetched successfully',
//             topics: documents
//         });
//     });
// });

// app.delete('/api/topics/:id', (req, res, next) => {
//     Topic.deleteOne({ _id: req.params.id}).then((result) => {
//         console.log(result);
//         res.status(200).json({
//             message: 'Post Deleted!'
//         });
//     });
// });

module.exports = app;