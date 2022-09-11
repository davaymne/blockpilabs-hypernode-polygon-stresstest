# blockpilabs-hypernode-polygon-stresstest


## Tasks

### Task 1
Test one (during the first 15 mins): 
 - Test one is to send simple requests with gradually increased virtual users. Choose the methods below. You can decide the request combination and the request order. Then follow the 3×5 mins VU rules to send requests to the BlockPI network. Save the resulting output of the load testing tool at the end. Check out the k6 docs to specify different VUs at different time https://k6.io/docs/test-types/soak-testing.

 - Methods: eth_getTransactionBy*******, eth_blockNumber, eth_getTransactionByBlockNumberAndIndex

3×5 mins VU rules:
 - First 5 minutes: 500 virtual users.
 - Second 5 minutes: 1000 virtual users. 
 - Third 5 minutes: 2000 virtual users.

### Task 2

Test two (during the second 15 mins):

Test two is to send requests to interact with a dapp contract. Write a script to get the token price with "getAmountsOut" method. Then follow the 3×5 mins VU rules to send requests to the BlockPI network. Save the resulting output of the load testing tool at the end. 

Script demo: https://github.com/BlockPILabs/StressTest/blob/master/test2/polygon_call.js
Target contract: https://polygonscan.com/address/0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff#code 

3×5 mins VU rules:
 - First 5 minutes: 500 virtual users.
 - Second 5 minutes: 1000 virtual users.
 - Third 5 minutes: 2000 virtual users.

## Tool for stress test
For stress-test we use https://k6.io/

### Install k6
```
sudo mkdir .gnupg/
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

>  NOTE:
If you faced an issue with max file open

Increase file limit
```
sudo bash -c "cat >/etc/security/limits.d/90-blockpi-nofiles.conf <<EOF
# Increase process file descriptor count limit
* - nofile 1000000
EOF"
```
Close all open sessions (log out then, in again)


## Run test script

```
k6 run bp-stress-stage-1-random.js
```

## Result similar to this

```

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: bp-stress-stage-1-random.js
     output: -

  scenarios: (100.00%) 1 scenario, 2000 max VUs, 45s max duration (incl. graceful stop):
           * contacts: Up to 2000 looping VUs for 15s over 3 stages (gracefulRampDown: 0s, gracefulStop: 30s)


running (16.2s), 0000/2000 VUs, 12215 complete and 0 interrupted iterations
contacts ✓ [======================================] 0000/2000 VUs  15s

     ✓ Is status = 200
     ✗ Is status != 200
      ↳  0% — ✓ 0 / ✗ 12215
     ✗ Is error = hypernode not found
      ↳  0% — ✓ 34 / ✗ 12181
     ✗ Is error =  timeout
      ↳  3% — ✓ 383 / ✗ 11832

     checks.........................: 25.85% ✓ 12632      ✗ 36228 
     data_received..................: 35 MB  2.2 MB/s
     data_sent......................: 3.3 MB 203 kB/s
     http_req_blocked...............: avg=14.47ms  min=68ns    med=661ns   max=130.39ms p(90)=86.89ms  p(95)=90.64ms 
     http_req_connecting............: avg=6.97ms   min=0s      med=0s      max=79.34ms  p(90)=41.95ms  p(95)=43.43ms 
     http_req_duration..............: avg=101.2ms  min=90.73ms med=96.21ms max=338.15ms p(90)=119.57ms p(95)=121.5ms 
       { expected_response:true }...: avg=101.2ms  min=90.73ms med=96.21ms max=338.15ms p(90)=119.57ms p(95)=121.5ms 
     http_req_failed................: 0.00%  ✓ 0          ✗ 12215 
     http_req_receiving.............: avg=51.41µs  min=6.18µs  med=47.38µs max=1.78ms   p(90)=97.7µs   p(95)=112.93µs
     http_req_sending...............: avg=73.14µs  min=8.65µs  med=57.23µs max=837.2µs  p(90)=154.14µs p(95)=176.88µs
     http_req_tls_handshaking.......: avg=7.47ms   min=0s      med=0s      max=67.63ms  p(90)=44.71ms  p(95)=46.82ms 
     http_req_waiting...............: avg=101.08ms min=90.6ms  med=96.08ms max=338.07ms p(90)=119.43ms p(95)=121.36ms
     http_reqs......................: 12215  754.026188/s
     iteration_duration.............: avg=1.11s    min=1.09s   med=1.09s   max=1.45s    p(90)=1.18s    p(95)=1.19s   
     iterations.....................: 12215  754.026188/s
     vus............................: 332    min=93       max=1987
     vus_max........................: 2000   min=2000     max=2000

```
