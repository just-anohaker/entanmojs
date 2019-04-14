"use strict";

const assert = require("assert").strict;
const _ = require("lodash");

const { HttpClient } = require("../lib");
const Helper = require("./helper");

const _kAPIRootPath = "/api/signatures/";
const _kAPIRoutes = {
    getFee: _kAPIRootPath + "fee",          /// GET
    addSignature: _kAPIRootPath             /// PUT
};

class Signatures extends Helper {
    constructor() {
        super();

        this._httpclient = new HttpClient();
    }

    async getFee(server, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getFee;
        return await this._apiHandler(this._httpclient.get(urlpath, undefined, timeout));
    }

    async addSignature(server, secret, secondSecret, {
        publicKey,
        multisigAccountPublicKey
    } = {}, timeout = 4000) {
        assert(_.isString(secret), "secret must be string");
        assert(_.isString(secondSecret), "secondSecret must be string");
        const urlpath = server + _kAPIRoutes.addSignature;
        const urldata = { secret, secondSecret };
        if (_.isString(publicKey)) urldata.publicKey = publicKey;
        if (_.isString(multisigAccountPublicKey)) urldata.multisigAccountPublicKey = multisigAccountPublicKey;
        return await this._apiHandler(this._httpclient.put(urlpath, urldata, timeout));
    }
}

module.exports = Signatures;