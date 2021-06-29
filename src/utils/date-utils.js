"use strict";

const moment = require('moment');

const lastWeekDateStart = moment().subtract(7, 'days').startOf('day').format();
const lastWeekDateEnd = moment().subtract(7, 'days').endOf('day').format();


// evaluateDate 
// This method evaluates if the itemDate has already passed our initialDate
// and if it is will set the flag on the map 
// Will check if itemDate is approaching or has passed a closeTimestamp to our date 
// returns a boolean - true if itemDate is inside our date(7 days ago) and false if it is not

const evaluateDate = (itemDate, map) => {

    let itemDateUTC = formatDateToUTC(itemDate);

    let closeTimestamp = moment(lastWeekDateStart).subtract(1, 'hours').format();

    // Break condition for the while loop - when we've passed the date there's nothing more to count!
    if (moment(itemDateUTC) < moment(lastWeekDateStart)) {
        map.set('passedDate', true);
    }

    // are you approaching the initial date or have passed the closeTimestamp to initial date
    // we'll be making to decrement our id's to the batches one by one
    if (moment(itemDateUTC) > moment(closeTimestamp)) {
        map.set('approachingInitialDate', true);
    }

    // check if the item is inside the timestamp range that we want 
    return moment(itemDateUTC).isBefore(lastWeekDateEnd) && moment(itemDateUTC).isAfter(lastWeekDateStart);

};

module.exports.evaluateDate = evaluateDate;

const formatDateToUTC = (unixTimeStamp) => {
    return moment(unixTimeStamp, 'X').format();
};