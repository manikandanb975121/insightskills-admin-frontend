const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const CollegeTest = require('../models/collegeTest');
const CustomizedTest = require('../models/collegeCustomizedQuestions');
const Test = require('../models/atest');




module.exports = router;
