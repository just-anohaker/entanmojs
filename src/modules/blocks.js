"use strict";

const _ = require("lodash");

const { HttpClient } = require("../lib");
const Helper = require("./helper");

const _kAPIRootPath = "/api/blocks/";
const _kAPIRoutes = {
    getBlock: _kAPIRootPath + "get",                /// get
    getFullBlock: _kAPIRootPath + "full",           /// get
    getBlocks: _kAPIRootPath,                       /// get
    getHeight: _kAPIRootPath + "getHeight",         /// get
    getFee: _kAPIRootPath + "getFee",               /// get
    getMilestone: _kAPIRootPath + "getMilestone",   /// get
    getReward: _kAPIRootPath + "getReward",         /// get
    getSupply: _kAPIRootPath + "getSupply",         /// get
    getStatus: _kAPIRootPath + "getStatus"          /// get
};

class Blocks extends Helper {
    constructor() {
        super();

        this._httpclient = new HttpClient();
    }

    async getBlock(server, { id, height } = {}, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getBlock;
        const urldata = {};
        if (_.isString(id)) urldata.id = id;
        if (_.isInteger(height)) urldata.height = height;
        return this._apiHandler(this._httpclient.get(urlpath, urldata, timeout));
    }

    async getFullBlock(server, { id, height } = {}, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getFullBlock;
        const urldata = {};
        if (_.isString(id)) urldata.id = id;
        if (_.isInteger(height)) urldata.height = height;
        return await this._apiHandler(this._httpclient.get(urlpath, urldata, timeout));
    }

    async getBlocks(server, {
        height,
        previousBlock,
        generatorPublicKey,
        offset,
        limit,
        orderBy,
        reward,
        totalAmount,
        totalFee
    } = {}, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getBlocks;
        const urldata = {};
        if (_.isInteger(height)) urldata.height = height;
        if (_.isString(previousBlock)) urldata.previousBlock = previousBlock;
        if (_.isString(generatorPublicKey)) urldata.generatorPublicKey = generatorPublicKey;
        if (_.isInteger(offset)) urldata.offset = offset;
        if (_.isInteger(limit)) urldata.limit = limit;
        if (_.isString(orderBy)) urldata.orderBy = orderBy;
        if (_.isInteger(reward)) urldata.reward = reward;
        if (_.isInteger(totalAmount)) urldata.totalAmount = totalAmount;
        if (_.isInteger(totalFee)) urldata.totalFee = totalFee;
        return this._apiHandler(this._httpclient.get(urlpath, urldata, timeout));
    }

    async getHeight(server, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getHeight;
        return await this._apiHandler(this._httpclient.get(urlpath, undefined, timeout));
    }

    async getFee(server, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getFee;
        return await this._apiHandler(this._httpclient.get(urlpath, undefined, timeout));
    }

    async getMilestone(server, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getMilestone;
        return await this._apiHandler(this._httpclient.get(urlpath, undefined, timeout));
    }

    async getReward(server, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getReward;
        return await this._apiHandler(this._httpclient.get(urlpath, undefined, timeout));
    }

    async getSupply(server, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getSupply;
        return await this._apiHandler(this._httpclient.get(urlpath, undefined, timeout));
    }

    async getStatus(server, timeout = 4000) {
        const urlpath = server + _kAPIRoutes.getStatus;
        return await this._apiHandler(this._httpclient.get(urlpath, undefined, timeout));
    }
}

module.exports = Blocks;