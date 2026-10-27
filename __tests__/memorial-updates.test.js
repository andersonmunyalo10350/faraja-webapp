const request = require('supertest');
const app = require('../js/Backend/server');

describe('GET /memorials/updates', () => {
  it('returns a list of memorial updates', async () => {
    const res = await request(app).get('/memorials/updates')
      .set('X-API-Key', 'faraja-test-key');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('returns updates with the expected fields', async () => {
    const res = await request(app).get('/memorials/updates')
      .set('X-API-Key', 'faraja-test-key');

    expect(res.status).toBe(200);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('memorialId');
      expect(res.body[0]).toHaveProperty('update');
      expect(res.body[0]).toHaveProperty('updatedAt');

      expect(typeof res.body[0].memorialId).toBe('number');
      expect(typeof res.body[0].update).toBe('string');
      expect(typeof res.body[0].updatedAt).toBe('string');
    }
  });
});
