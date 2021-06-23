"use strict";
const addToMap = require('./map-utils').addWordToMap;


const cleanText = (string) => {
    string = string.replace(/[^a-zA-Z ]/g, "");

    return string.replace(/\s+/g, ' ').trim()
};
module.exports.cleanText = cleanText;

const textWordsCounter = (text, map) => {
    let words = text.split(" ");
    words.forEach(word => {

        addToMap(map, word);

    });

};

module.exports.textWordsCounter = textWordsCounter;
