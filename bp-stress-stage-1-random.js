import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    scenarios: {
        contacts: {
            executor: "ramping-vus",
            startVUs: 0,
            stages: [
                { duration: "5m", target: 500 },
                { duration: "5m", target: 1000 },
                { duration: "5m", target: 2000 },
            ],
            gracefulRampDown: "0s",
        },
    },
};

export default function () {
    let response;
    const url = "https://polygon.testnet.blockpi.net/v1/rpc/<YOUR KEY>";
    const data = [
        {
            jsonrpc: "2.0",
            method: "eth_blockNumber",
            params: [],
            id: 1,
        },
        {
            jsonrpc: "2.0",
            method: "eth_getTransactionByHash",
            params: [
                "0xa3f6c173b0085c670683ab9fe3272aae1bf712c17d89fd0dbe784441b83c967f",
            ],
            id: 1,
        },
        {
            jsonrpc: "2.0",
            method: "eth_getTransactionByBlockNumberAndIndex",
            params: ["latest", "0x0"],
            id: 1,
        },
    ];
    const randMethod = data[Math.floor(Math.random() * data.length)];
    const headers = { headers: { "Content-Type": "application/json" },};

    response = http.post(url, JSON.stringify(randMethod), headers);
    check(response, { 'Is status = 200': (r) => r.status == 200 });
    check(response, { 'Is status != 200': (r) => r.status != 200 });
    check(response, {
      'Is error = hypernode not found': (r) =>
        r.body.includes('hypernode not found'),
    });
    check(response, {
      'Is error =  timeout': (r) =>
        r.body.includes('timeout'),
    });
    //console.log(response);
    sleep(1);
}
