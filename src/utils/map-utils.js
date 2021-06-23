"use strict";

// Adjust the WORD_COUNTER_LIMIT here if you want to show more occurring words

const WORD_COUNTER_LIMIT = 10;



// convert our sorted map to a JSON object considering our WORD_COUNTER_LIMIT

const convertMapToJSON = (map, numberOfStories) => {
    let payload = {};
    let numberWordsCounter = 0;

    for (let [key, value] of map.entries()) {
        if (numberWordsCounter === WORD_COUNTER_LIMIT) {
            break;
        }
        payload[key] = value;
        numberWordsCounter++;
    }
    payload.number_of_stories = numberOfStories;

    return payload;
};

module.exports.convertMapToJSON = convertMapToJSON;

const addWordToMap = (map, word) => {
    if (map.has(word)) {
        map.set(word, map.get(word) + 1);
    } else {
        map.set(word, 1);
    }
};

module.exports.addWordToMap = addWordToMap;

  // sort our map by value
const sortMapByValue = (map) => {
    return new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
};

module.exports.sortMapByValue = sortMapByValue;

