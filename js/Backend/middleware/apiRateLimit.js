const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit');

const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) => {
    const apiKey = req.get('X-API-Key');

    if (apiKey) {
      return `key:${apiKey}`;
    }

    return ipKeyGenerator(req.ip);
  },

  handler: (req, res) => {
    res.set('Retry-After', '60');

    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
      retryAfter: 60
    });
  }
});

module.exports = apiRateLimiter;
