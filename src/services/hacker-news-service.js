"use strict";

const axios = require('axios');
const util = require('util');
const { handleHttpErrors } = require('../utils/error-utils');

module.exports.getStories = async () => {
    let response;
    try {
        response = await axios.get(process.env.HACKER_NEWS_API_STORIES_URL);
    } catch (e) {
        handleHttpErrors(endpoint, null, e);
        return { 
            success: false,
            error: "Failed to GET - HN API Get Stories Failed!"
        };
    }

    return {
        success: true, 
        data: response.data,
    }
};

module.exports.getSingleItem = async (storyId) => {
    const endpoint = util.format(process.env.HACKER_NEWS_API_GET_SINGLE_ITEM, storyId);
    let response;
    try {
        response = await axios.get(endpoint);
    } catch (e) {
        handleHttpErrors(endpoint, null, e);
        return { 
            success: false,
            error: "Failed to GET - HN API Get Single Story Failed!"
        };
    }

    return response.data;
};






