"use strict";

const { HttpClient } = require("../lib");
const Helper = require("./helper");

class Peer extends Helper {
    constructor() {
        super();

        this._httpclient = new HttpClient();
    }
}

module.exports = Peer;