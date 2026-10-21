const { request, apiUrl } = require('./config');

describe('FundiLink POST /jobs', () => {

  test('creates a job with valid data', async () => {
    const job = {
      title: 'Automated Test Plumbing Job',
      category: 'plumbing',
      location: 'Westlands, Nairobi',
      pay: 1500,
      payType: 'fixed',
      urgent: false,
      duration: '2 hours',
      employerId: 2,
      employer: 'Test Employer',
      description: 'Job created during automated API testing'
    };

    const res = await request(apiUrl)
      .post('/jobs')
      .send(job);

    expect(res.status).toBe(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('category');
    expect(res.body).toHaveProperty('location');
    expect(res.body).toHaveProperty('pay');

    expect(typeof res.body.id).toBe('number');
    expect(res.body.title).toBe(job.title);
    expect(res.body.category).toBe(job.category);
    expect(res.body.location).toBe(job.location);
    expect(res.body.pay).toBe(job.pay);
  });

  test('checks how the API handles a job request missing required fields', async () => {
  const res = await request(apiUrl)
    .post('/jobs')
    .send({
      title: 'Incomplete Test Job'
    });

  // FundiLink's contract does not specify the validation
  // response for invalid requests. Record the actual result
  // during live testing and clarify the contract if necessary.
  expect([400, 422, 500]).toContain(res.status);
  });
});