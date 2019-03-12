"use strict";

const axios = require("axios");

/**
 * @class 
 * 
 * A HttpClient base on axios library.
 * 
 */
class HttpClient {
    /**
     * HttpClient GET请求
     * @async
     * 
     * @param {String} url - 请求的节点，protocol://hostname:port
     * @param {Object} params - GET请求附加的参数信息，以key-value方式存储
     * @param {Number} [timeout=4000] - GET请求超时时间,default=4000
     * 
     * @returns {Promise<axios.Response>} 
     * 
     */
    async get(url, params = {}, timeout = 4000) {
        return await axios.get(url, { params, timeout });
    }

    /**
     * HttpClient PUT请求
     * @async
     * 
     * @param {String} url - 请求的节点，protocol://hostname:port
     * @param {Obhect} data - PUT请求附加的参数信息，以key-value方式存储
     * @param {Number} [timeout=4000] - PUT请求越野时间,default=4000 
     * 
     * @returns {Promise<axios.Response>}
     * 
     */
    async put(url, data = {}, timeout = 4000) {
        return await axios.put(url, data, { timeout });
    }

    /**
     * HttpClient POST请求
     * @async
     * 
     * @param {String} url - 请求的节点，protocol://hostname:port
     * @param {Obhect} data - POST请求附加的参数信息，以key-value方式存储
     * @param {Number} [timeout=4000] - POST请求越野时间,default=4000 
     * 
     * @returns {Promise<axios.Response>}
     * 
     */
    async post(url, data = {}, timeout = 4000) {
        return await axios.post(url, data, { timeout });
    }
}

/**
 * @exports HttpClient
 */
module.exports = HttpClient;