import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '30s',
  target: 4000
}

const baseUrl = 'http://167.172.84.128:4000';

const trackingPath = '/api/tracking/thp/status';

const headers = {
  "x-session-id": "202311111759207715359",
  "x-transaction-id": Date.now(),
  "content-type": "application/json",
  authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWVhMDkxODUtNzc3Ny00ZTFlLWE2ODctNWZmOGNmMjczZDdjIiwicHVibGljX2lkIjoic3lzdGVtQHJyLWNvbnNvbGlkYXRvci5jb20iLCJwdWJsaWNfaWRfdHlwZSI6ImVtYWlsIiwicm9sZSI6InN5c3RlbSIsInNjb3BlIjpbInRyYWNraW5nL3RocC9zdGF0dXMiXSwiaWF0IjoxNjg5OTY4OTM4fQ.EO7FIfVb82akQwCjSZu9fzVyVgonosP0DcKNL66CQW4"
}

const body = {
  "items": [
    {
      "barcode": "EF190024133TH",
      "status": "103",
      "status_description": "รับฝาก",
      "status_date": "11/11/2566 17:45:34+07:00",
      "location": "คลังสินค้า รล. Pick Up Service",
      "postcode": "10004",
      "delivery_status": null,
      "delivery_description": null,
      "delivery_datetime": null,
      "receiver_name": null,
      "signature": null,
      "delivery_officer_name": null,
      "delivery_officer_tel": null,
      "office_name": null,
      "office_tel": null,
      "call_center_tel": "1545"
    }
  ],
  "track_datetime": "11/11/2566 17:56+07:00"
}

const sendTrackingStatus = () => {
  const url = `${baseUrl}${trackingPath}`;
  const response = http.post(url, body, {headers});

  if (response.status === 200) {
    console.log('Tracking status sent successfully!');
  } else {
    console.error('Error sending tracking status:', response.body);
  }
};

export default function() {
  sendTrackingStatus();
}
