const request = require('supertest');
const app = require('../js/Backend/server');

describe('GET /memorial-events', () => {
  it('returns a list of memorial events', async () => {
    const res = await request(app).get('/memorial-events')
      .set('X-API-Key', 'faraja-test-key');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('returns memorial events with the expected fields', async () => {
    const res = await request(app).get('/memorial-events')
      .set('X-API-Key', 'faraja-test-key');

    expect(res.status).toBe(200);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('memorialId');
      expect(res.body[0]).toHaveProperty('eventName');
      expect(res.body[0]).toHaveProperty('date');
      expect(res.body[0]).toHaveProperty('location');

      expect(typeof res.body[0].id).toBe('number');
      expect(typeof res.body[0].memorialId).toBe('number');
      expect(typeof res.body[0].eventName).toBe('string');
      expect(typeof res.body[0].date).toBe('string');
      expect(typeof res.body[0].location).toBe('string');
    }
  });
});
