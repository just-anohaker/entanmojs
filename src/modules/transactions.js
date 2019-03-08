"use strict";

const assert = require("assert").strict;
const _ = require("lodash");

const { HttpClient } = require("../lib");
const Helper = require("./helper");

const _kAPIRootPath = "/api/transactions/";
const _kAPIRoutes = {
    getTransactions: _kAPIRootPath,
    getTransaction: _kAPIRootPath + "get",
    getUnconfirmedTransaction: _kAPIRootPath + "unconfirmed/get",
    getUnconfirmedTransactions: _kAPIRootPath + "unconfirmed",
    addTransactions: _kAPIRootPath,
    addDelayTransactions: _kAPIRootPath + "delay"
};

class Transactions extends Helper {
    constructor() {
        super();

        this._httpclient = new HttpClient();
    }

    async getTransactions(server, {
        blockId,
        type,
        senderPublicKey,
        ownerPublicKey,
        ownerAddress,
        senderId,
        recipientId,
        amount,
        fee,
        offset = 0,
        limit = 100,
        orderBy
    } = {}, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getTransactions;
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
        return await this._apiHandler(this._httpclient.get(urlpath, urldata, timeout));
    }

    async getTransaction(server, id, timeout = 4000) {
        assert(_.isString(id), "id must be string");
        const urlpath = server + _kAPIRoutes.getTransaction;
        return await this._apiHandler(this._httpclient.get(urlpath, { id }, timeout));
    }

    async getUnconfirmedTransactions(server, { senderPublicKey, address } = {}, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getUnconfirmedTransactions;
        const urldata = {};
        if (_.isString(senderPublicKey)) urldata.senderPublicKey = senderPublicKey;
        if (_.isString(address)) urldata.address = address;
        return this._apiHandler(this._httpclient.get(urlpath, urldata, timeout));
    }

    async getUnconfirmedTransaction(server, id, timeout = 4000) {
        assert(_.isString(id), "id must be string");
        const urlpath = server + _kAPIRoutes.getUnconfirmedTransaction;
        return await this._apiHandler(this._httpclient.get(urlpath, { id }, timeout));
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
        const urlpath = server + _kAPIRoutes.addTransactions;
        const urldata = { secret, recipientId, amount };
        if (_.isString(publicKey)) urldata.publicKey = publicKey;
        if (_.isString(secondSecret)) urldata.secondSecret = secondSecret;
        if (_.isString(multisigAccountPublicKey)) urldata.multisigAccountPublicKey = multisigAccountPublicKey;
        if (_.isString(message)) urldata.message = message;
        return await this._apiHandler(this._httpclient.put(urlpath, urldata, timeout));
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
        const urlpath = server + _kAPIRoutes.addDelayTransactions;
        const urldata = { secret, recipientId, amount, args: [expiredTime] };
        if (_.isString(publicKey)) urldata.publicKey = publicKey;
        if (_.isString(secondSecret)) urldata.secondSecret = secondSecret;
        if (_.isString(multisigAccountPublicKey)) urldata.multisigAccountPublicKey = multisigAccountPublicKey;
        if (_.isString(message)) urldata.message = message;
        return await this._apiHandler(this._httpclient.put(urlpath, urldata, timeout));
    }
}

module.exports = Transactions;