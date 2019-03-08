"use strict";

const assert = require("assert").strict;
const _ = require("lodash");

const { HttpClient } = require("../lib");
const Helper = require("./helper");

const _kAPIRootPath = "/api/accounts/";
const _kAPIRoutes = {
    open: _kAPIRootPath + "open",                               // post
    open2: _kAPIRootPath + "open2",                             // post
    getBalance: _kAPIRootPath + "getBalance",                   // get
    getPublicKey: _kAPIRootPath + "getPublicKey",               // get
    generatePublicKey: _kAPIRootPath + "generatePublicKey",     // post
    getDelegates: _kAPIRootPath + "delegates",                  // get
    getDelegatesFee: _kAPIRootPath + "delegates/fee",           // get
    addDelegates: _kAPIRootPath + "delegates",                  // put
    getAccount: _kAPIRootPath,                                  // get
    newAccount: _kAPIRootPath + "new",                          // get
    accountOnBlockchain: _kAPIRootPath + "effectivity",         // get
    getDelayTransactions: _kAPIRootPath + "delayOrders",        // get
    top: _kAPIRootPath + "top",                                 // get
    count: _kAPIRootPath + "count"                              // get
};

class Accounts extends Helper {
    constructor() {
        super();

        this._httpclient = new HttpClient();
    }

    async open(server, secret, timeout = 4000) {
        assert(_.isString(secret), "secret must be string");
        const urlpath = server + _kAPIRoutes.open;
        return await this._apiHandler(this._httpclient.post(urlpath, { secret }, timeout));
    }

    async open2(server, publicKey, timeout = 4000) {
        assert(_.isString(publicKey, "publicKey must be string"));
        const urlpath = server + _kAPIRoutes.open2;
        return await this._apiHandler(this._httpclient.post(urlpath, { publicKey }, timeout));
    }

    async getBalance(server, address, timeout = 4000) {
        assert(_.isString(address), "address must be string");
        const urlpath = server + _kAPIRoutes.getBalance;
        return await this._apiHandler(this._httpclient.get(urlpath, { address }, timeout));
    }

    async getPublicKey(server, address, timeout = 4000) {
        assert(_.isString(address), "address must be string");
        const urlpath = server + _kAPIRoutes.getPublicKey;
        return await this._apiHandler(this._httpclient.get(urlpath, { address }, timeout));
    }

    async generatePublicKey(server, secret, timeout = 4000) {
        assert(_.isString(secret), "secret must be string");
        const urlpath = server + _kAPIRoutes.generatePublicKey;
        return await this._apiHandler(this._httpclient.post(urlpath, { secret }, timeout));
    }

    async getDelegates(server, address, timeout = 4000) {
        assert(_.isString(address), "address must be string");
        const urlpath = server + _kAPIRoutes.getDelegates;
        return await this._apiHandler(this._httpclient.get(urlpath, { address }, timeout));
    }

    async getDelegatesFee(server, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getDelegatesFee;
        return await this._apiHandler(this._httpclient.get(urlpath, undefined, timeout));
    }

    async addDelegates(server, secret, addDelegate, removeDelegate, {
        publicKey,
        secondSecret,
        multisigAccountPublicKey
    } = {}, timeout = 4000) {
        assert(_.isString(secret), "secret must be string");
        assert(_.isNil(addDelegate) || _.isString(addDelegate), "addDelegate must be null or string");
        assert(_.isNil(removeDelegate) || _.isString(removeDelegate), "removeDelegate must be null or string");
        const urlpath = server + _kAPIRoutes.addDelegates;
        const urldata = { secret, delegates: [] };
        if (addDelegate) urldata.delegates.push("+" + addDelegate);
        if (removeDelegate) urldata.delegates.push("-" + removeDelegate);
        if (_.isString(publicKey)) urldata.publicKey = publicKey;
        if (_.isString(secondSecret)) urldata.secondSecret = secondSecret;
        if (_.isString(multisigAccountPublicKey)) urldata.multisigAccountPublicKey = multisigAccountPublicKey;
        return await this._apiHandler(this._httpclient.put(urlpath, urldata, timeout));
    }

    async getAccount(server, address, timeout = 4000) {
        assert(_.isString(address), "address must be string");
        const urlpath = server + _kAPIRoutes.getAccount;
        return await this._apiHandler(this._httpclient.get(urlpath, { address }, timeout));
    }

    async newAccount(server, ent = 128, timeout = 4000) {
        assert(_.isInteger(ent), "ent must be integer and one of [128, 256]");
        const urlpath = server + _kAPIRoutes.newAccount;
        return await this._apiHandler(this._httpclient.get(urlpath, { ent }, timeout));
    }

    async accountOnBlockchain(server, address, timeout = 4000) {
        assert(_.isString(address), "address must be string");
        const urlpath = server + _kAPIRoutes.accountOnBlockchain;
        return await this._apiHandler(this._httpclient.get(urlpath, { address }, timeout));
    }

    async getDelayTransactions(server, address, mode = 1, timeout = 4000) {
        assert(_.isString(address), "address must be string");
        assert(_.isInteger(mode), "mode must be integer and one of [0, 1]");
        const urlpath = server + _kAPIRoutes.getDelayTransactions;
        return await this._apiHandler(this._httpclient.get(urlpath, { address, mode }, timeout));
    }

    async getAccountCount(server, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.count;
        return await this._apiHandler(this._httpclient.get(urlpath, undefined, timeout));
    }

    async getAccountInfos(server, offset = 0, limit = 100, timeout = 4000) {
        assert(_.isInteger(offset), "offset must be integer");
        assert(_.isInteger(limit), "limit must be integer");
        const urlpath = server + _kAPIRoutes.top;
        return await this._apiHandler(this._httpclient.get(urlpath, { offset, limit }, timeout));
    }
}

module.exports = Accounts;