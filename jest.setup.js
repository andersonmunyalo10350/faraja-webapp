const { pool } = require('./js/Backend/config/db');

// Supply a test API key for the existing Faraja endpoint tests.
process.env.API_KEYS = [
  process.env.API_KEYS,
  'faraja-test-key'
]
  .filter(Boolean)
  .join(',');

afterAll(async () => {
  await pool.end();
});