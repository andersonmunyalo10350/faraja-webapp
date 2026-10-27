const request = require('supertest');
const app = require('../js/Backend/server');

describe('GET /gbv-affected-areas', () => {
  it('returns a list of GBV affected areas', async () => {
    const res = await request(app).get('/gbv-affected-areas')
      .set('X-API-Key', 'faraja-test-key');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('returns areas with the expected fields', async () => {
    const res = await request(app).get('/gbv-affected-areas')
      .set('X-API-Key', 'faraja-test-key');

    expect(res.status).toBe(200);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('area');
      expect(res.body[0]).toHaveProperty('numberOfCases');

      expect(typeof res.body[0].area).toBe('string');
      expect(typeof res.body[0].numberOfCases).toBe('number');
    }
  });

  it('handles an empty result set correctly', async () => {
    const res = await request(app).get('/gbv-affected-areas')
      .set('X-API-Key', 'faraja-test-key');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
