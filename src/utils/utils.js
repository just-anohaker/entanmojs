"use strict";

/**
 * 
 * A helper for handle axios response
 * @function
 * 
 * @param {Object} response - axios request's response object
 * 
 * @returns {Object} - {done:"true|false", data: "response.data if done is ture", error:"message if done is false"}
 */
const responseHandler = response => {
    const result = { done: false, error: "" };
    if (response.status !== 200) {
        result.error = `status: ${response.status}, statusText: ${response.statusText}`;
        return result;
    }

    const { data: { success, error = "" } } = response;
    if (!success) {
        result.error = error;
        return result;
    }

    const { data } = response;
    delete data.success;
    delete data.error;

    result.done = true;
    result.data = data;
    return result;
};

module.exports = {
    responseHandler
};