"use strict";

const { modules: { Blocks } } = require("../");

const server = "http://13.56.210.205:4096";

function main() {
    const blocksInst = new Blocks();

    blocksInst.getHeight(server)
        //blocksInst.getFullBlock(server, { height: 100, id: "51b74e0d5759e26ad453bbeb010ddf6e714aa6cecf9b39e9abf95e89ba3f5341" })
        // blocksInst.getBlocks(server, { limit: 5, previousBlock: "b8f0e9310ede1fc64fbbcdc7dee0edebdd74490017e5b4261573c14c80de591a" })
        .then(result => {
            console.log("result:", JSON.stringify(result, null, 2));
        })
        .catch(error => {
            console.log("error:", error);
        });
}

main();