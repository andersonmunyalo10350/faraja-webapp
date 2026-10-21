const { request, apiUrl } = require('./config');

describe('FundiLink GET /jobs/:id/bookings', () => {

  test('returns a list of bookings for a job', async () => {
    const res = await request(apiUrl)
      .get('/jobs/1/bookings');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('returns bookings with the expected fields', async () => {
    const res = await request(apiUrl)
      .get('/jobs/1/bookings');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const booking = res.body[0];

      expect(booking).toHaveProperty('id');
      expect(booking).toHaveProperty('jobId');
      expect(booking).toHaveProperty('workerId');
      expect(booking).toHaveProperty('status');

      expect(typeof booking.id).toBe('number');
      expect(typeof booking.jobId).toBe('number');
      expect(typeof booking.workerId).toBe('number');

      expect([
        'pending',
        'confirmed',
        'rejected',
        'completed'
      ]).toContain(booking.status);
    }
  });

});