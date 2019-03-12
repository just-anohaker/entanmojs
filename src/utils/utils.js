"use strict";

/**
 * 用于保存处理axios.Response结果的数据结构
 */
class Result {
    constructor() {
        this.done = false;  /// 标记请求结果是否有效
        this.error = "";    /// 错误信息，当done == false
        this.data = {};     /// 返回结果，当done == true
    }

    /**
     * @getter done
     */
    get Done() {
        return this.done;
    }

    /**
     * @getter error
     */
    get Error() {
        return this.error;
    }

    /**
     * @getter data
     */
    get Data() {
        return this.data;
    }
}

/**
 * 
 * A helper for handle axios response
 * @function
 * 
 * @param {Object} response - axios request's response object
 * 
 * @returns {Result} - {done:"true|false", data: "response.data if done is ture", error:"message if done is false"}
 */
const responseHandler = response => {
    const result = new Result();
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

/// export responseHandler
module.exports = {
    /**
     * @exports responseHandler
     */
    responseHandler,

    /**
     * @exports Result
     */
    Result
};