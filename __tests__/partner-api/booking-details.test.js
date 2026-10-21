const { request, apiUrl } = require('./config');

describe('FundiLink GET /bookings/:id', () => {

  test('returns an existing booking', async () => {
    const res = await request(apiUrl)
      .get('/bookings/1');

    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('jobId');
    expect(res.body).toHaveProperty('workerId');
    expect(res.body).toHaveProperty('status');

    expect(typeof res.body.id).toBe('number');
    expect(typeof res.body.jobId).toBe('number');
    expect(typeof res.body.workerId).toBe('number');

    expect([
      'pending',
      'confirmed',
      'rejected',
      'completed'
    ]).toContain(res.body.status);
  });

  test('returns 404 for a booking that does not exist', async () => {
    const res = await request(apiUrl)
      .get('/bookings/999999');

    expect(res.status).toBe(404);

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Booking not found');
  });

});