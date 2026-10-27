const request = require('supertest');
const app = require('../js/Backend/server');

describe('GET /funeral-projects/:id/contributions', () => {
  it('returns contributions for an existing funeral project', async () => {
    const res = await request(app)
      .get('/funeral-projects/1/contributions')
      .set('X-API-Key', 'faraja-test-key');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('returns the expected contribution fields', async () => {
    const res = await request(app)
      .get('/funeral-projects/1/contributions')
      .set('X-API-Key', 'faraja-test-key');

    expect(res.status).toBe(200);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('funeralProjectId');
      expect(res.body[0]).toHaveProperty('contributorName');
      expect(res.body[0]).toHaveProperty('amount');
      expect(res.body[0]).toHaveProperty('date');

      expect(typeof res.body[0].id).toBe('number');
      expect(typeof res.body[0].funeralProjectId).toBe('number');
      expect(typeof res.body[0].contributorName).toBe('string');
      expect(typeof res.body[0].amount).toBe('number');
      expect(typeof res.body[0].date).toBe('string');
    }
  });

  it('returns 404 for a funeral project that does not exist', async () => {
    const res = await request(app)
      .get('/funeral-projects/99999/contributions')
      .set('X-API-Key', 'faraja-test-key');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message');
  });
});
