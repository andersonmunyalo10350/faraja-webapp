const request = require('supertest');

process.env.API_KEYS = 'faraja-test-key';

const app = require('../js/Backend/server');

describe('API key authentication', () => {
  test('rejects a protected endpoint when the API key is missing', async () => {
    const response = await request(app).get('/memorials');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Missing or invalid API key');
  });

  test('rejects a protected endpoint when the API key is invalid', async () => {
    const response = await request(app)
      .get('/memorials')
      .set('X-API-Key', 'invalid-test-key');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  test('allows a request with a valid API key to pass authentication', async () => {
    const response = await request(app)
      .get('/memorials')
      .set('X-API-Key', 'faraja-test-key');

    expect(response.status).not.toBe(401);
  });
});
