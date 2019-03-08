"use strict";

const { modules: { LockVote } } = require("../");

const server = "http://13.56.210.205:4096";

function main() {
    const lockvoteInst = new LockVote();

    lockvoteInst.getAll(server, "AFibtrGkPXpHxJAXwontAmmHng2m79Bizg")
        .then(result => {
            console.log("result:", JSON.stringify(result, null, 2));
        })
        .catch(error => {
            console.log("error:", error.toString());
        });
}

main();