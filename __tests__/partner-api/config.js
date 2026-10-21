require('dotenv').config({
  path: '.env.partner'
});

const request = require('supertest');

const apiUrl = process.env.PARTNER_API_URL;

if (!apiUrl) {
  throw new Error(
    'PARTNER_API_URL is missing. Check the .env.partner file.'
  );
}

module.exports = {
  request,
  apiUrl
};