const request = require('supertest');
const app = require('../js/Backend/server');

const API_KEY = 'faraja-test-key';

describe('Partner API versioning', () => {

  test('v1 memorials returns the original array structure', async () => {
    const response = await request(app)
      .get('/v1/memorials')
      .set('X-API-Key', API_KEY);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('date');
      expect(response.body[0]).toHaveProperty('location');
    }
  });

  test('v1 responses include deprecation headers', async () => {
  const response = await request(app)
    .get('/v1/memorials')
    .set('X-API-Key', API_KEY);

  expect(response.headers.deprecation).toBe('true');
  expect(response.headers.sunset).toBeDefined();
  expect(response.headers.link).toContain('/v2/memorials');
});

test('v2 responses do not include deprecation headers', async () => {
  const response = await request(app)
    .get('/v2/memorials')
    .set('X-API-Key', API_KEY);

  expect(response.headers.deprecation).toBeUndefined();
  expect(response.headers.sunset).toBeUndefined();
});

  test('old unversioned endpoint remains equivalent to v1', async () => {
    const v1 = await request(app)
      .get('/v1/memorials')
      .set('X-API-Key', API_KEY);

    const oldEndpoint = await request(app)
      .get('/memorials')
      .set('X-API-Key', API_KEY);

    expect(oldEndpoint.status).toBe(200);
    expect(oldEndpoint.body).toEqual(v1.body);
  });

  test('v1 returns the expected 404 response for unknown routes', async () => {
    const response = await request(app)
      .get('/v1/not-a-real-route')
      .set('X-API-Key', API_KEY);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('not found');
  });

  test('v2 memorials returns the new structured response', async () => {
    const response = await request(app)
      .get('/v2/memorials')
      .set('X-API-Key', API_KEY);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('count');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.count).toBe(response.body.data.length);
  });

  test('v2 requires a valid API key', async () => {
    const response = await request(app).get('/v2/memorials');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

});
