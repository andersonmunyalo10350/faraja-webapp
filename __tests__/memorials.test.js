const request = require('supertest');
const app = require('../js/Backend/server');

describe('GET /memorials', () => {
  it('returns a list of memorials', async () => {
    const res = await request(app).get('/memorials')
      .set('X-API-Key', 'faraja-test-key');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('returns memorials with the expected fields', async () => {
    const res = await request(app).get('/memorials')
      .set('X-API-Key', 'faraja-test-key');

    expect(res.status).toBe(200);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('date');
      expect(res.body[0]).toHaveProperty('location');

      expect(typeof res.body[0].id).toBe('number');
      expect(typeof res.body[0].name).toBe('string');
      expect(typeof res.body[0].date).toBe('string');
      expect(typeof res.body[0].location).toBe('string');
    }
  });
});
