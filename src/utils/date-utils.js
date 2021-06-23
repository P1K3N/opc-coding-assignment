const moment = require('moment');

const lastWeekDateStart = moment().subtract(7, 'days').startOf('day').format();
const lastWeekDateEnd = moment().subtract(7, 'days').endOf('day').format();



// method to check if a given date is inside the beginning and the end of the day (7 days ago)
const isDateInsideAllowedRange = (itemDate) => {
    let itemDateUTC = formatDateToUTC(itemDate);

   return moment(itemDateUTC).isBefore(lastWeekDateEnd) && moment(itemDateUTC).isAfter(lastWeekDateStart);
};

module.exports.isDateInsideAllowedRange = isDateInsideAllowedRange;

const isDateBeforeStartDate = (itemDate) => {
    let itemDateUTC = formatDateToUTC(itemDate);
    return moment(itemDateUTC) < moment(lastWeekDateStart); 
};

module.exports.isDateBeforeStartDate = isDateBeforeStartDate;

const isDateApproachingInitialDate = (itemDate) => {
    let closeTimestamp = moment(lastWeekDateStart).subtract(1,'hours').format();
    let itemDateUTC = formatDateToUTC(itemDate);
    return moment(itemDateUTC) > moment(closeTimestamp);
};

module.exports.isDateApproachingInitialDate = isDateApproachingInitialDate;

const formatDateToUTC = (unixTimeStamp) => {
    return moment(unixTimeStamp, 'X').format();
};