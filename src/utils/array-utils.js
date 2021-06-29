"use strict";

const hackerNewsService = require('../services/hacker-news-service');


// method that generates a BatchArray
// depending on the the value of approachingInitialDate
// it will decrement one by one (true) or decrement 100 each time(false)
// to fasten up our search
// Batch size can be changed by changing the value of the BATCHES_REQUESTS_SIZE
// For greater amount than 150 we need to be careful since we can miss a lot of stories 
// that we want to check
const generateBatchArray = (map) => {
    let arr = [];
    let decrementalValue = 100;

    if (map.get('approachingInitialDate') === true) {

        decrementalValue = 1;
    }

    for (let i = 0; i <= process.env.BATCHES_REQUESTS_SIZE; i++) {
        let newCurrentOffset = map.get('offset') - decrementalValue;

        arr.push(hackerNewsService.getSingleItem(newCurrentOffset));
        map.set('offset', newCurrentOffset);

    }

    return arr;
};

module.exports.generateBatchArray = generateBatchArray;