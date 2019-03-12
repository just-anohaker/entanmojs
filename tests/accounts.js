"use strict";

const { modules: { Accounts } } = require("../");
const { tester } = require("./tester");
const config = require("./config");

function main() {
    const accountInst = new Accounts();

    tester("new_account", async () => {
        return await accountInst.newAccount(config.kNodeServer);
    }, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log(JSON.stringify(result, null, 2));
    });

    tester("open", async () => {
        return await accountInst.open(config.kNodeServer, "salad note delay insect exile favorite find silver tent raw pole orient");
    }, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log(JSON.stringify(result, null, 2));
    });

    tester("open2", async () => {
        return await accountInst.open2(config.kNodeServer, "f2c8b0290311a1d96bdabf744ea6b0245fb14c2965b35f84ac3365eb576a8bed");
    }, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log(JSON.stringify(result, null, 2));
    });

    tester("count", async () => {
        return await accountInst.getAccountCount(config.kNodeServer);
    }, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log(JSON.stringify(result, null, 2));
    });
}

main();