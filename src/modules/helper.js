"use strict";

const { responseHandler } = require("../utils");

/**
 * A base class for all module subclass with response helper function
 * 
 * @class
 * 
 */
class Helper {
    /**
     * A response handler helper function
     * @async
     * 
     * @param {Promise<axios.Request>} asyncAPICall - A promise for axios library request
     * @param {Function} dataConvert - A function for convert response.data property
     * 
     * @returns {Object} - Same as the result of responsehandler helper
     */
    async _apiHandler(asyncAPICall, dataConvert) {
        if (typeof dataConvert !== "function") dataConvert = null;

        const result = { done: false };
        try {
            const response = await asyncAPICall;
            const respResult = responseHandler(response);
            if (!respResult.done) {
                result.error = respResult.error;
                return result;
            }

            result.done = true;
            result.data = dataConvert ? dataConvert(respResult.data) : respResult.data;
        } catch (error) {
            result.error = error.toString();
        }
        return result;
    }
}

module.exports = Helper;