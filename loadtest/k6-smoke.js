import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.01']
  }
};

const BASE = __ENV.K6_TARGET || 'https://exchange.com';

export default function () {
  const res = http.get(BASE + '/');
  check(res, { 'status 200': r => r.status === 200 });
  sleep(1);
}
