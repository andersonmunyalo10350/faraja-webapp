const express = require('express');
const router = express.Router();
const { fetchWithRetry } = require('./resilientFetch');

router.get('/users', async (req, res) => {
    console.log('FundiLink /users route was reached');
  try {
    const baseUrl = process.env.FUNDILINK_API_URL;
    const apiKey = process.env.FUNDILINK_API_KEY;

    if (!baseUrl || !apiKey) {
      return res.status(500).json({
        success: false,
        message: 'FundiLink configuration is missing'
      });
    }

    const response = await fetchWithRetry(
      `${baseUrl.replace(/\/$/, '')}/users`,
      {
        headers: {
          'X-API-Key': apiKey
        }
      },
      {
        timeoutMs: 1500,
        retries: 2,
        delayMs: 200
      }
    );

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        message: 'FundiLink service is unavailable'
      });
    }

    const users = await response.json();

    return res.json({
      success: true,
      data: users
    });

  } catch (error) {
    const reason = error.name === 'TimeoutError'
      ? 'timeout'
      : (error.cause?.code || error.message);

    console.error('FundiLink request failed:', error);

    return res.status(502).json({
      success: false,
      message: 'Unable to retrieve FundiLink users'
    });
  }
});

module.exports = router;