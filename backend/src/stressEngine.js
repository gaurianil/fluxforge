const axios = require("axios");

async function runStressTest(url, requests, concurrency) {
    let results = [];
    let completed = 0;
    let active = 0;

    return new Promise((resolve) => {

        const sendRequest = () => {
            if (completed >= requests) {
                if (active === 0) {
                    resolve(summary(results));
                }
                return;
            }

            active++;
            const start = Date.now();

            axios.get(url)
                .then(() => {
                    results.push({ success: true, time: Date.now() - start });
                })
                .catch(() => {
                    results.push({ success: false, time: Date.now() - start });
                })
                .finally(() => {
                    active--;
                    completed++;
                    sendRequest();
                });
        };

        for (let i = 0; i < concurrency; i++) {
            sendRequest();
        }
    });
}

function summary(results) {
    const success = results.filter(r => r.success).length;
    const fail = results.length - success;
    const avg = results.reduce((a, b) => a + b.time, 0) / results.length;

    return {
        total: results.length,
        success,
        fail,
        avgResponseTime: avg
    };
}

module.exports = { runStressTest };