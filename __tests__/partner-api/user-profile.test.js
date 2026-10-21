const { request, apiUrl } = require('./config');

describe('FundiLink GET /users/:id', () => {

  test('returns an existing user profile', async () => {
    const res = await request(apiUrl)
      .get('/users/1');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('firstName');
    expect(res.body).toHaveProperty('lastName');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('role');

    expect(typeof res.body.id).toBe('number');
    expect(typeof res.body.firstName).toBe('string');
    expect(typeof res.body.lastName).toBe('string');
    expect(typeof res.body.email).toBe('string');

    expect(['worker', 'employer']).toContain(res.body.role);
  });

  test('returns 404 for a user that does not exist', async () => {
    const res = await request(apiUrl)
      .get('/users/999999');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('User not found');
  });

});