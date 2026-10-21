const { request, apiUrl } = require('./config');

describe('FundiLink GET /users', () => {

  test('returns a list of users', async () => {
    const res = await request(apiUrl)
      .get('/users');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('returns users with the required fields', async () => {
    const res = await request(apiUrl)
      .get('/users');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const user = res.body[0];

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('firstName');
      expect(user).toHaveProperty('lastName');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('role');

      expect(typeof user.id).toBe('number');
      expect(typeof user.firstName).toBe('string');
      expect(typeof user.lastName).toBe('string');
      expect(typeof user.email).toBe('string');

      expect(['worker', 'employer']).toContain(user.role);
    }
  });

  test('filters users by role', async () => {
    const res = await request(apiUrl)
      .get('/users')
      .query({ role: 'worker' });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    for (const user of res.body) {
      expect(user.role).toBe('worker');
    }
  });

  test('returns an empty array when no users match a filter', async () => {
    const res = await request(apiUrl)
      .get('/users')
      .query({ location: 'NoSuchLocation_987654' });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

});