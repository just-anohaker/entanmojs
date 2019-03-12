"use strict";

const assert = require("assert").strict;
const _ = require("lodash");

const { HttpClient } = require("../lib");
const Helper = require("./helper");

const kAPIRootPath = "/api/transactions/";
const kAPIRoutes = {
    getTransactions: kAPIRootPath,                               /// GET
    getTransaction: kAPIRootPath + "get",                        /// GET
    getUnconfirmedTransaction: kAPIRootPath + "unconfirmed/get", /// GET
    getUnconfirmedTransactions: kAPIRootPath + "unconfirmed",    /// GET
    addTransactions: kAPIRootPath,                               /// PUT
    addDelayTransactions: kAPIRootPath + "delay"                 /// PUT
};

/**
 * 链上交易处理接口
 * @class
 */
class Transactions extends Helper {
    constructor() {
        super();

        /// http请求实例
        this.httpclient = new HttpClient();
    }

    /**
     * 获取满足条件的交易集
     * @async
     * 
     * @param {String} server - 请求节点服务器信息
     * @param {Object} opts - 可选参数
     * @param {String} opts.blockId - 区块Id
     * @param {Number} opts.type - 交易类型
     * @param {String} opts.senderId - 交易发送者地址
     * @param {String} opts.senderPublicKey - 交易发送者公钥
     * @param {String} opts.recipientId - 交易接收者地址
     * @param {String} opts.ownerAddress - 交易参与者地址(包含发送者和接收者)
     * @param {String} opts.ownerPublicKey - 交易参与者公钥(包含发送者和接收者)
     * @param {Number} opts.amount - 交易金额
     * @param {Number} opts.fee - 交易费
     * @param {Number} [opts.offset=0] - 偏移量
     * @param {Number} [opts.limit=100] - 获取交易最大数量
     * @param {String} opts.orderBy - 排序规则
     * @param {String} opts.currency - 交易货币单位
     * @param {String} opts.and - 参数条件的连接方式
     * @param {Number} [timeout=4000] - 请求超时时间
     * 
     * @returns {Promise<Result>}
     */
    async getTransactions(server, {
        blockId,
        type,
        senderId,
        senderPublicKey,
        recipientId,
        ownerAddress,
        ownerPublicKey,
        amount,
        fee,
        offset = 0,
        limit = 100,
        orderBy,
        currency,
        and
    } = {}, timeout = 4000) {
        const urlpath = server + kAPIRoutes.getTransactions;
        const urldata = {};
        if (_.isString(blockId)) urldata.blockId = blockId;
        if (_.isInteger(type)) urldata.type = type;
        if (_.isString(senderPublicKey)) urldata.senderPublicKey = senderPublicKey;
        if (_.isString(ownerPublicKey)) urldata.ownerPublicKey = ownerPublicKey;
        if (_.isString(ownerAddress)) urldata.ownerAddress = ownerAddress;
        if (_.isString(senderId)) urldata.senderId = senderId;
        if (_.isString(recipientId)) urldata.recipientId = recipientId;
        if (_.isInteger(amount)) urldata.amount = amount;
        if (_.isInteger(fee)) urldata.fee = fee;
        if (_.isInteger(offset)) urldata.offset = offset;
        if (_.isInteger(limit)) urldata.limit = limit;
        if (_.isString(orderBy)) urldata.orderBy = orderBy;
        if (_.isString(currency)) urldata.currency = currency;
        if (_.isInteger(and)) urldata.and = and;
        return await this._apiHandler(this.httpclient.get(urlpath, urldata, timeout));
    }

    async getTransaction(server, id, timeout = 4000) {
        assert(_.isString(id), "id must be string");
        const urlpath = server + kAPIRoutes.getTransaction;
        return await this._apiHandler(this.httpclient.get(urlpath, { id }, timeout));
    }

    async getUnconfirmedTransactions(server, { senderPublicKey, address } = {}, timeout = 4000) {
        const urlpath = server + kAPIRoutes.getUnconfirmedTransactions;
        const urldata = {};
        if (_.isString(senderPublicKey)) urldata.senderPublicKey = senderPublicKey;
        if (_.isString(address)) urldata.address = address;
        return this._apiHandler(this.httpclient.get(urlpath, urldata, timeout));
    }

    async getUnconfirmedTransaction(server, id, timeout = 4000) {
        assert(_.isString(id), "id must be string");
        const urlpath = server + kAPIRoutes.getUnconfirmedTransaction;
        return await this._apiHandler(this.httpclient.get(urlpath, { id }, timeout));
    }

    async addTransactions(server, secret, recipientId, amount, {
        publicKey,
        secondSecret,
        multisigAccountPublicKey,
        message
    } = {}, timeout = 4000) {
        assert(_.isString(secret), "secret must be string");
        assert(_.isString(recipientId), "recipientId must be string");
        assert(_.isInteger(amount), "amount must be integer");
        const urlpath = server + kAPIRoutes.addTransactions;
        const urldata = { secret, recipientId, amount };
        if (_.isString(publicKey)) urldata.publicKey = publicKey;
        if (_.isString(secondSecret)) urldata.secondSecret = secondSecret;
        if (_.isString(multisigAccountPublicKey)) urldata.multisigAccountPublicKey = multisigAccountPublicKey;
        if (_.isString(message)) urldata.message = message;
        return await this._apiHandler(this.httpclient.put(urlpath, urldata, timeout));
    }

    async addDelayTransactions(server, secret, recipientId, amount, expiredTime, {
        publicKey,
        secondSecret,
        multisigAccountPublicKey,
        message
    } = {}, timeout = 4000) {
        assert(_.isString(secret), "secret must be string");
        assert(_.isString(recipientId), "recipientId must be string");
        assert(_.isInteger(amount), "amount must be integer");
        assert(_.isInteger(expiredTime), "expiredTime must be integer");
        const urlpath = server + kAPIRoutes.addDelayTransactions;
        const urldata = { secret, recipientId, amount, args: [expiredTime] };
        if (_.isString(publicKey)) urldata.publicKey = publicKey;
        if (_.isString(secondSecret)) urldata.secondSecret = secondSecret;
        if (_.isString(multisigAccountPublicKey)) urldata.multisigAccountPublicKey = multisigAccountPublicKey;
        if (_.isString(message)) urldata.message = message;
        return await this._apiHandler(this.httpclient.put(urlpath, urldata, timeout));
    }
}

/**
 * @exports Transactions
 */
module.exports = Transactions;