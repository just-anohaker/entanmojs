"use strict";

const tester = (TAG, req, resp) => {
    (async () => {
        const result = await req();
        console.log(`[${TAG.toUpperCase()}] `);
        return result;
    })()
        .then(result => {
            resp(null, result);
        })
        .catch(error => {
            resp(error);
        });
};

module.exports = {
    tester
};