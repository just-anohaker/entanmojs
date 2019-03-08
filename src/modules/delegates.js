"use strict";

const assert = require("assert").strict;
const _ = require("lodash");

const { HttpClient } = require("../lib");
const Helper = require("./helper");

const _kAPIRootPath = "/api/delegates/";
const _kAPIRoutes = {
    count: _kAPIRootPath + "count",
    getVoters: _kAPIRootPath + "voters",
    getDelegate: _kAPIRootPath + "get",
    getDelegates: _kAPIRootPath,
    getFee: _kAPIRootPath + "fee",
    getForgedByAccount: _kAPIRootPath + "forging/getForgedByAccount",
    addDelegate: _kAPIRootPath,
    removeDelegate: _kAPIRootPath + "undelegate"
};

class Delegates extends Helper {
    constructor() {
        super();

        this._httpclient = new HttpClient();
    }

    async getDelegatesCount(server, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.count;
        return await this._apiHandler(this._httpclient.get(urlpath, undefined, timeout));
    }

    async getVoters(server, publicKey, timeout = 4000) {
        assert(_.isString(publicKey), "publicKey must be string");
        const urlpath = server + _kAPIRoutes.getVoters;
        return await this._apiHandler(this._httpclient.get(urlpath, { publicKey }, timeout));
    }

    async getDelegate(server, { publicKey, username } = {}, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getDelegate;
        const urldata = {};
        if (_.isString(publicKey)) urldata.publicKey = publicKey;
        if (_.isString(username)) urldata.username = username;
        return await this._apiHandler(this._httpclient.get(urlpath, urldata, timeout));
    }

    async getDelegates(server, { address, offset = 0, limit = 100, orderBy } = {}, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getDelegates;
        const urldata = {};
        if (_.isString(address)) urldata.address = address;
        if (_.isInteger(offset)) urldata.offset = offset;
        if (_.isInteger(limit)) urldata.limit = limit;
        if (_.isString(orderBy)) urldata.orderBy = orderBy;
        return await this._apiHandler(this._httpclient.get(urlpath, urldata, timeout));
    }

    async getFee(server, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getFee;
        return await this._apiHandler(this._httpclient.get(urlpath, undefined, timeout));
    }

    async getForgedByAccount(server, publicKey, timeout = 4000) {
        assert(_.isString(publicKey), "publicKey must be string");
        const urlpath = server + _kAPIRoutes.getForgedByAccount;
        const urldata = { generatorPublicKey: publicKey };
        return await this._apiHandler(this._httpclient.get(urlpath, urldata, timeout));
    }

    async addDelegate(server, secret, username, {
        secondSecret,
        publicKey,
        multisigAccountPublicKey
    } = {}, timeout = 4000) {
        assert(_.isString(secret), "secret must be string");
        assert(_.isString(username), "username must be string");
        const urlpath = server + _kAPIRoutes.addDelegate;
        const urldata = { secret, username };
        if (_.isString(secondSecret)) urldata.secondSecret = secondSecret;
        if (_.isString(publicKey)) urldata.publicKey = publicKey;
        if (_.isString(multisigAccountPublicKey)) urldata.multisigAccountPublicKey = multisigAccountPublicKey;
        return await this._apiHandler(this._httpclient.put(urlpath, urldata, timeout));
    }

    async removeDelegate(server, secret, {
        publicKey,
        secondSecret,
        multisigAccountPublicKey
    } = {}, timeout = 4000) {
        assert(_.isString(secret), "secret must be string");
        const urlpath = server + _kAPIRoutes.addDelegate;
        const urldata = { secret };
        if (_.isString(secondSecret)) urldata.secondSecret = secondSecret;
        if (_.isString(publicKey)) urldata.publicKey = publicKey;
        if (_.isString(multisigAccountPublicKey)) urldata.multisigAccountPublicKey = multisigAccountPublicKey;
        return await this._apiHandler(this._httpclient.put(urlpath, urldata, timeout));
    }
}

module.exports = Delegates;