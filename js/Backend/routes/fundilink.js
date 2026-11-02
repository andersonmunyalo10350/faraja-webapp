const express = require('express');
const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const baseUrl = process.env.FUNDILINK_API_URL;
    const apiKey = process.env.FUNDILINK_API_KEY;

    if (!baseUrl || !apiKey) {
      return res.status(500).json({
        success: false,
        message: 'FundiLink configuration is missing'
      });
    }

    const response = await fetch(
      `${baseUrl.replace(/\/$/, '')}/users`,
      {
        headers: {
          'X-API-Key': apiKey
        }
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
    console.error('FundiLink request failed:', error.message);

    return res.status(502).json({
      success: false,
      message: 'Unable to retrieve FundiLink users'
    });
  }
});

module.exports = router;