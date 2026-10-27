const request = require('supertest');
const app = require('../js/Backend/server');

describe('POST /awareness-activities', () => {
  it('creates an awareness activity with valid data', async () => {
    const activity = {
      memorialEventId: 1,
      activityName: 'Automated Test Activity',
      description: 'Created during Week 7 automated testing',
      date: '2026-09-20'
    };

    const res = await request(app)
      .post('/awareness-activities')
      .set('X-API-Key', 'faraja-test-key')
      .send(activity);

    expect(res.status).toBe(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('memorialEventId');
    expect(res.body).toHaveProperty('activityName');

    expect(typeof res.body.id).toBe('number');
    expect(typeof res.body.memorialEventId).toBe('number');
    expect(typeof res.body.activityName).toBe('string');

    expect(res.body.memorialEventId).toBe(1);
    expect(res.body.activityName).toBe('Automated Test Activity');
  });

  it('rejects a request with a missing activityName', async () => {
    const activity = {
      memorialEventId: 1
    };

    const res = await request(app)
      .post('/awareness-activities')
      .set('X-API-Key', 'faraja-test-key')
      .send(activity);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('rejects a request when memorialEventId has the wrong type', async () => {
    const activity = {
      memorialEventId: 'one',
      activityName: 'Invalid ID Test'
    };

    const res = await request(app)
      .post('/awareness-activities')
      .set('X-API-Key', 'faraja-test-key')
      .send(activity);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('rejects an empty activityName', async () => {
    const activity = {
      memorialEventId: 1,
      activityName: '   '
    };

    const res = await request(app)
      .post('/awareness-activities')
      .set('X-API-Key', 'faraja-test-key')
      .send(activity);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('rejects a malformed date', async () => {
    const activity = {
      memorialEventId: 1,
      activityName: 'Invalid Date Test',
      date: 'not-a-date'
    };

    const res = await request(app)
      .post('/awareness-activities')
      .set('X-API-Key', 'faraja-test-key')
      .send(activity);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('rejects a nonexistent memorial event', async () => {
    const activity = {
      memorialEventId: 99999,
      activityName: 'Nonexistent Event Test'
    };

    const res = await request(app)
      .post('/awareness-activities')
      .set('X-API-Key', 'faraja-test-key')
      .send(activity);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });
});
