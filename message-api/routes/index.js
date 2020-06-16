"use strict";


import express from 'express';
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Successfully connected to the api ! \\(^ヮ^)/');
});

/* GET home page. */
router.get('/test', function(req, res, next) {
    res.send('One, two. One, two. this is a test.');
});

export default router;
