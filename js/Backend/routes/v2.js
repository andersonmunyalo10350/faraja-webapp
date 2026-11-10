const express = require('express');
const router = express.Router();

const D = require('../controllers/donationController');
const F = require('../controllers/funeralController');
const A = require('../controllers/awarenessController');

const apiKeyAuth = require('../middleware/apiKeyAuth');
const apiRateLimiter = require('../middleware/apiRateLimit');

// Protect all v2 partner API endpoints.
router.use(apiKeyAuth);
router.use(apiRateLimiter);

// GET /v2/memorials — returns structured response.
router.get('/memorials', async (req, res) => {
  try {
    const originalJson = res.json.bind(res);

    res.json = function (memorials) {
      if (!Array.isArray(memorials)) {
        return originalJson(memorials);
      }

      return originalJson({
        data: memorials,
        count: memorials.length
      });
    };

    await F.getMemorialsForContract(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
