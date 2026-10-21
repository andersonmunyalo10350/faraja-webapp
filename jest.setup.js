const { pool } = require('./js/Backend/config/db');

afterAll(async () => {
  await pool.end();
});