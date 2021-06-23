const express = require('express');
const router = express.Router();
const wordCounterService = require('../services/word-count-service');


router.get('/words', async (req, res) => {
    let result = await wordCounterService.getStoriesWordCountHNAPI();

    const status = result.success ? 200 : 400;

    return res.status(status).json(result.data)
});


module.exports = router;