"use strict";
const _ = require("lodash");

const { responseHandler, Result } = require("../utils");

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
     * @param {Promise<axios.Request>} reqPromise - A promise for axios library request
     * @param {Function} dataConvert - A function for convert response.data property
     * 
     * @returns {Promise<Result>} - see at utils.utils.js -> class Result
     */
    async _apiHandler(reqPromise, dataConvert) {
        if (!_.isFunction(dataConvert)) dataConvert = data => data;

        const result = new Result();
        try {
            const response = await reqPromise;
            const respResult = responseHandler(response);
            if (!respResult.done) {
                result.error = respResult.error;
                return result;
            }

            result.done = true;
            result.data = dataConvert(respResult.data);
        } catch (error) {
            result.error = error.toString();
        }
        return result;
    }
}

/**
 * @exports Helper
 */
module.exports = Helper;