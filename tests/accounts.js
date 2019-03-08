"use strict";

const { modules: { Accounts } } = require("../");

const server = "http://13.56.210.205:4096";
// const server = "http://120.77.168.107:4096";

function main() {
    const accountsInst = new Accounts();

    // accountsInst.open(server, "race forget pause shoe trick first abuse insane hope budget river enough")
    // accountsInst.newAccount(server, 256)
    // accountsInst.open(server, "brief yellow figure little assist velvet harvest reason hollow grunt write meat shoulder amazing arrest warm retreat urge seat ordinary maid yard main advance")
    // accountsInst.accountOnBlockchain(server, "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr")
    // accountsInst.getDelayTransactions(server, "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr")
    // accountsInst.open2(server, "79cd733de6541383e133b8791101344d5c46e89f2c8df5c20a7768d8e7b73f5d1")
    // accountsInst.generatePublicKey(server, "design wise spider canyon strong school turn horror famous fluid explain cage")
    // accountsInst.getAccountCount(server)
    accountsInst.getAccount(server, 123)
        .then(result => {
            console.log("result:", JSON.stringify(result, null, 2));

            return accountsInst.getAccountInfos(server, 0, 10);
        })
        .then(result => {
            console.log("result:", JSON.stringify(result, null, 2));
        })
        .catch(error => {
            console.log("error:", error);
        });
}

main();