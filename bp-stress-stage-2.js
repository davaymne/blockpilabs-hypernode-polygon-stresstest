import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 500 },
   { duration: '5m', target: 1000 },
    { duration: '5m', target: 2000 },
  ],
};

const url = "<YOUR KEY>";
const headers = { headers: { 'Content-Type': 'application/json' },}

const coinList = ["0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619","0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174","0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7","0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063","0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b","0xb33EaAd8d922B1083446DC23f610c2567fB5180f","0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683"]

function checkAddr(addr){
	
	return addr.slice(2)
}

export default function () {
	var coin =checkAddr(coinList[Math.floor(Math.random() * coinList.length)])

    var data = 
    {   
        jsonrpc: "2.0",
        method: "eth_call",
        params: [{"to":"0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff","data":`0xd06ca61f000000000000000000000000000000000000000000000000000000003b9aca0000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f000000000000000000000000${coin}`},"latest"],
        id: 1,
    }

  
        var response = http.post(url, JSON.stringify(data), headers);
   
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
   
    // Automatically added sleep
    sleep(1)
}
