"use strict";

// Although I'm not doing nothing here just to point out 
// that here we should choose what to do with errors

const handleHttpErrors = (endpoint, body, error) => {
 // check the type of error, handle it and throw a message
};
module.exports.handleHttpErrors = handleHttpErrors;

const handleUnexpectedErrors = (errors) => {
// handler for unexpected errors
};
module.exports.handleUnexpectedErrors = handleUnexpectedErrors;