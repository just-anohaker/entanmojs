"use strict";

const assert = require("assert").strict;
const _ = require("lodash");

const { HttpClient } = require("../lib");
const Helper = require("./helper");

const kAPIRootPath = "/api/accounts/";
const kAPIRoutes = {
    open: kAPIRootPath + "open",                               // POST
    open2: kAPIRootPath + "open2",                             // POST
    getBalance: kAPIRootPath + "getBalance",                   // GET
    getPublicKey: kAPIRootPath + "getPublicKey",               // GET
    generatePublicKey: kAPIRootPath + "generatePublicKey",     // POST
    getDelegates: kAPIRootPath + "delegates",                  // GET
    getDelegatesFee: kAPIRootPath + "delegates/fee",           // GET
    addDelegates: kAPIRootPath + "delegates",                  // GET
    getAccount: kAPIRootPath,                                  // GET
    newAccount: kAPIRootPath + "new",                          // GET
    accountOnBlockchain: kAPIRootPath + "effectivity",         // GET
    getDelayTransactions: kAPIRootPath + "delayOrders",        // GET
    top: kAPIRootPath + "top",                                 // GET
    count: kAPIRootPath + "count"                              // GET
};

/**
 * 用户账号信息接口
 * 
 * @class
 */
class Accounts extends Helper {
    constructor() {
        super();

        /// http请求实例
        this.httpclient = new HttpClient();
    }

    /**
     * 使用secret登陆
     * @function
     * @async
     * 
     * @param {String} server - 请求的节点服务器信息，eg. http://192.168.1.1:4096
     * @param {String} secret - 登陆使用的secret单词串
     * @param {Number} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>}
     */
    async open(server, secret, timeout = 4000) {
        assert(_.isString(secret), "secret must be string");
        const urlpath = server + kAPIRoutes.open;
        return await this._apiHandler(this.httpclient.post(urlpath, { secret }, timeout));
    }

    /**
     * 使用publicKey登陆
     * @function
     * @async
     * 
     * @param {String} server - 请求节点服务器信息
     * @param {String} publicKey - 账号publicKey
     * @param {Number} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>}
     */
    async open2(server, publicKey, timeout = 4000) {
        assert(_.isString(publicKey, "publicKey must be string"));
        const urlpath = server + kAPIRoutes.open2;
        return await this._apiHandler(this.httpclient.post(urlpath, { publicKey }, timeout));
    }

    /**
     * 获取账号余额
     * @function
     * @async
     * 
     * @param {String} server - 请求节点服务器信息
     * @param {String} address - 账号地址
     * @param {Number} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>}
     */
    async getBalance(server, address, timeout = 4000) {
        assert(_.isString(address), "address must be string");
        const urlpath = server + kAPIRoutes.getBalance;
        return await this._apiHandler(this.httpclient.get(urlpath, { address }, timeout));
    }

    /**
     * 获取账号地址对应的publicKey
     * @function
     * @async
     * 
     * @param {String} server - 请求节点服务器信息
     * @param {String} address - 账号地址
     * @param {Number} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>}
     */
    async getPublicKey(server, address, timeout = 4000) {
        assert(_.isString(address), "address must be string");
        const urlpath = server + kAPIRoutes.getPublicKey;
        return await this._apiHandler(this.httpclient.get(urlpath, { address }, timeout));
    }

    /**
     * 通过账号secret信息获取对应的publicKey
     * @function
     * @async
     * 
     * @param {String} server - 请求节点服务器信息
     * @param {String} secret - 账号secret
     * @param {Number} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>}
     */
    async generatePublicKey(server, secret, timeout = 4000) {
        assert(_.isString(secret), "secret must be string");
        const urlpath = server + kAPIRoutes.generatePublicKey;
        return await this._apiHandler(this.httpclient.post(urlpath, { secret }, timeout));
    }

    /**
     * 获取账号投票代理人信息
     * @function
     * @async
     * 
     * @param {String} server - 请求节点服务器信息
     * @param {String} address - 账号地址
     * @param {Number} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>}
     */
    async getDelegates(server, address, timeout = 4000) {
        assert(_.isString(address), "address must be string");
        const urlpath = server + kAPIRoutes.getDelegates;
        return await this._apiHandler(this.httpclient.get(urlpath, { address }, timeout));
    }

    /**
     * 获取投票交易费
     * @function
     * @async
     * 
     * @param {String} server - 请求节点服务器信息
     * @param {Number} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>}
     */
    async getDelegatesFee(server, timeout = 4000) {
        const urlpath = server + kAPIRoutes.getDelegatesFee;
        return await this._apiHandler(this.httpclient.get(urlpath, undefined, timeout));
    }

    /**
     * 投票
     * @function
     * @async
     * 
     * @param {String} server - 请求节点服务器信息
     * @param {String} secret - 账号secret
     * @param {String} addDelegate - 待添加投票代理人publicKey
     * @param {String} removeDelegate - 待删除代理人publicKey
     * @param {Object} opts - 附加参数
     * @param {String} opts.publicKey - 账号publicKey
     * @param {String} opts.secondSecret - 账号二级密码
     * @param {String} opts.multisigAccountPublicKey - 多重签名账号publicKey 
     * @param {Number} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>}
     */
    async addDelegates(server, secret, addDelegate, removeDelegate, {
        publicKey,
        secondSecret,
        multisigAccountPublicKey
    } = {}, timeout = 4000) {
        assert(_.isString(secret), "secret must be string");
        assert(_.isNil(addDelegate) || _.isString(addDelegate), "addDelegate must be null or string");
        assert(_.isNil(removeDelegate) || _.isString(removeDelegate), "removeDelegate must be null or string");
        const urlpath = server + kAPIRoutes.addDelegates;
        const urldata = { secret, delegates: [] };
        if (addDelegate) urldata.delegates.push("+" + addDelegate);
        if (removeDelegate) urldata.delegates.push("-" + removeDelegate);
        if (_.isString(publicKey)) urldata.publicKey = publicKey;
        if (_.isString(secondSecret)) urldata.secondSecret = secondSecret;
        if (_.isString(multisigAccountPublicKey)) urldata.multisigAccountPublicKey = multisigAccountPublicKey;
        return await this._apiHandler(this.httpclient.put(urlpath, urldata, timeout));
    }

    /**
     * 获取账号详情
     * @function
     * @async
     * 
     * @param {String} server - 请求节点服务器信息
     * @param {String} address - 账号地址
     * @param {Number} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>}
     */
    async getAccount(server, address, timeout = 4000) {
        assert(_.isString(address), "address must be string");
        const urlpath = server + kAPIRoutes.getAccount;
        return await this._apiHandler(this.httpclient.get(urlpath, { address }, timeout));
    }

    /**
     * 创建新的账号信息
     * @function
     * @async
     * 
     * @param {String} server - 请求节点服务器信息
     * @param {Number=} [ent=128] - 密码长度[128, 256]    
     * @param {Number=} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>} 
     */
    async newAccount(server, ent = 128, timeout = 4000) {
        assert(_.isInteger(ent), "ent must be integer and one of [128, 256]");
        const urlpath = server + kAPIRoutes.newAccount;
        return await this._apiHandler(this.httpclient.get(urlpath, { ent }, timeout));
    }

    /**
     * 查询账号信息是否存在于区块链数据库中
     * @function
     * @async
     * 
     * @param {String} server - 请求节点服务器信息
     * @param {String} address - 账号地址
     * @param {Number} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>}
     */
    async accountOnBlockchain(server, address, timeout = 4000) {
        assert(_.isString(address), "address must be string");
        const urlpath = server + kAPIRoutes.accountOnBlockchain;
        return await this._apiHandler(this.httpclient.get(urlpath, { address }, timeout));
    }

    /**
     * 获取账号延时到账交易信息
     * @function
     * @async
     * 
     * @param {String} server - 请求节点服务器信息
     * @param {String} address - 账号地址
     * @param {Number} [mode=1] - 交易状态
     * @param {Number} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>}
     */
    async getDelayTransactions(server, address, mode = 1, timeout = 4000) {
        assert(_.isString(address), "address must be string");
        assert(_.isInteger(mode), "mode must be integer and one of [0, 1]");
        const urlpath = server + kAPIRoutes.getDelayTransactions;
        return await this._apiHandler(this.httpclient.get(urlpath, { address, mode }, timeout));
    }

    /**
     * 获取当前链中的有效账号总数
     * @function
     * @async
     * 
     * @param {String} server - 请求节点服务器信息
     * @param {Number} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>}
     */
    async getAccountCount(server, timeout = 4000) {
        const urlpath = server + kAPIRoutes.count;
        return await this._apiHandler(this.httpclient.get(urlpath, undefined, timeout));
    }

    /**
     * 获取账号信息
     * @function
     * @async
     * 
     * @param {String} server - 请求节点服务器信息
     * @param {Number} [offset=0] - 起始偏移值
     * @param {Number} [limit=100] - 请求最大量，最大值不能超过100
     * @param {Number} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>}
     */
    async getAccountInfos(server, offset = 0, limit = 100, timeout = 4000) {
        assert(_.isInteger(offset), "offset must be integer");
        assert(_.isInteger(limit), "limit must be integer");
        const urlpath = server + kAPIRoutes.top;
        return await this._apiHandler(this.httpclient.get(urlpath, { offset, limit }, timeout));
    }
}

/**
 * @exports Accounts
 */
module.exports = Accounts;