const BASE_URL = 'http://localhost:5000';

const endpoints = [
  '/memorials',
  '/memorial-events',
  '/gbv-affected-areas',
  '/memorials/updates',
  '/unknown-endpoint'
];

async function main() {
  const apiKey = process.env.FARAJA_API_KEY;

  if (!apiKey) {
    console.error('ERROR: FARAJA_API_KEY environment variable is not set.');
    process.exit(1);
  }

  const total = Number(process.argv[2]) || 60;

  let successful = 0;
  let failed = 0;

  console.log(`Sending ${total} requests to Faraja API...`);

  for (let i = 0; i < total; i++) {
    const path = endpoints[i % endpoints.length];

    const headers = {
      'X-API-Key': i % 3 === 0 ? 'wrong-test-key' : apiKey
    };

    try {
      const response = await fetch(BASE_URL + path, {
        method: 'GET',
        headers: headers
      });

      console.log(`${i + 1}. GET ${path} - HTTP ${response.status}`);

      if (response.status < 500) {
        successful++;
      } else {
        failed++;
      }

    } catch (error) {
      console.log(`${i + 1}. GET ${path} - Request failed: ${error.message}`);
      failed++;
    }

    await new Promise(function(resolve) {
      setTimeout(resolve, 50);
    });
  }

  console.log('\n========== TRAFFIC SUMMARY ==========');
  console.log(`Total requests: ${total}`);
  console.log(`Responses received: ${successful}`);
  console.log(`Request failures: ${failed}`);
  console.log('=====================================');
  console.log('Traffic generation completed.');
}

main();