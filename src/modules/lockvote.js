"use strict";

const assert = require("assert").strict;

const _ = require("lodash");

const { HttpClient } = require("../lib");
const Helper = require("./helper");

const _kAPIRootPath = "/api/lockvote/";
const _kAPIRoutes = {
    addLockVote: _kAPIRootPath,
    removeLockVote: _kAPIRootPath + "remove",
    getAll: _kAPIRootPath + "all",
    get: _kAPIRootPath + "get",
    getById: _kAPIRootPath,                 /// pathname + id
};

class Lockvote extends Helper {
    constructor() {
        super();

        this._httpclient = new HttpClient();
    }

    async addLockVote(server, secret, lockamount, {
        publicKey,
        secondSecret,
        multisigAccountPublicKey
    } = {}, timeout = 4000) {
        assert(_.isString(secret), "secret must be string");
        assert(_.isInteger(lockamount), "lockamount must be integer");
        const urlpath = server + _kAPIRoutes.addLockVote;
        const urldata = { secret, args: { lockamount } };
        if (_.isString(publicKey)) urldata.publicKey = publicKey;
        if (_.isString(secondSecret)) urldata.secondSecret = secondSecret;
        if (_.isString(multisigAccountPublicKey)) urldata.multisigAccountPublicKey = multisigAccountPublicKey;
        return await this._apiHandler(this._httpclient.put(urlpath, urldata, timeout));
    }

    async removeLockVote(server, secret, lockvoteIds, {
        publicKey,
        secondSecret,
        multisigAccountPublicKey
    } = {}, timeout = 4000) {
        assert(_.isString(secret), "secret must be string");
        assert(_.isArray(lockvoteIds) || _.isString(lockvoteIds), "lockvoteIds must be array of string or string");
        const urlpath = server + _kAPIRoutes.removeLockVote;
        const urldata = { secret };
        if (_.isString(lockvoteIds)) {
            urldata.args = [lockvoteIds];
        } else if (_.isArray(lockvoteIds)) {
            urldata.args = [];
            lockvoteIds.forEach(el => {
                if (_.isString(el)) {
                    urldata.args.push(el);
                }
            });
        }
        if (_.isString(publicKey)) urldata.publicKey = publicKey;
        if (_.isString(secondSecret)) urldata.secondSecret = secondSecret;
        if (_.isString(multisigAccountPublicKey)) urldata.multisigAccountPublicKey = multisigAccountPublicKey;
        return await this._apiHandler(this._httpclient.put(urlpath, urldata, timeout));
    }

    async getAll(server, address, {
        state = 1,      /// 1:正在锁仓;0:已解锁仓
        offset = 0,
        limit = 100,
        orderByHeight = 0,
        orderByAmount = 0
    } = {}, timeout = 4000) {
        assert(_.isString(address), "address must be string");
        const urlpath = server + _kAPIRoutes.getAll;
        const urldata = { address };
        if (_.isInteger(state)) urldata.state = state;
        if (_.isInteger(offset)) urldata.offset = offset;
        if (_.isInteger(limit)) urldata.limit = limit;
        if (_.isInteger(orderByHeight)) urldata.orderByHeight = orderByHeight;
        if (_.isInteger(orderByAmount)) urldata.orderByAmount = orderByAmount;
        return await this._apiHandler(this._httpclient.get(urlpath, urldata, timeout));
    }

    async get(server, id, timeout = 4000) {
        assert(_.isString(id), "id must be string");
        const urlpath = server + _kAPIRoutes.get;
        return await this._apiHandler(this._httpclient.get(urlpath, { id }, timeout));
    }

    async getById(server, id, timeout = 4000) {
        assert(_.isString(id), "id must be string");
        const urlpath = server + _kAPIRoutes.get + `/${id}`;
        return await this._apiHandler(this._httpclient.get(urlpath, undefined, timeout));
    }
}

module.exports = Lockvote;