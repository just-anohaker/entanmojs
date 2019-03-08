"use strict";

const { HttpClient } = require("../lib");
const Helper = require("./helper");

class Server extends Helper {
    constructor() {
        super();

        this._httpclient = new HttpClient();
    }
}

module.exports = Server;