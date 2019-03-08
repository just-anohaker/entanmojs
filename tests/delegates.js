"use strict";

const { modules: { Delegates } } = require("../");

const server = "http://13.56.210.205:4096";

function main() {
    const delegatesInst = new Delegates();

    // delegatesInst.getDelegatesCount(server)
    // delegatesInst.getDelegate(server, { username: "etm_095" })
    delegatesInst.getDelegates(server, { limit: 10, offset: 90 })
        .then(result => {
            console.log("result:", JSON.stringify(result, null, 2));
        })
        .catch(error => {
            console.log("error:", error);
        });
}

main();