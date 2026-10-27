const crypto = require('crypto');

function apiKeyAuth(req, res, next) {
  const providedKey = req.get('X-API-Key');

  const configuredKeys = (process.env.API_KEYS || '')
    .split(',')
    .map(key => key.trim())
    .filter(Boolean);

  if (!providedKey || configuredKeys.length === 0) {
    return res.status(401).json({
      success: false,
      message: 'Missing or invalid API key'
    });
  }

  const providedBuffer = Buffer.from(providedKey);

  const isValid = configuredKeys.some(key => {
    const configuredBuffer = Buffer.from(key);

    return (
      providedBuffer.length === configuredBuffer.length &&
      crypto.timingSafeEqual(providedBuffer, configuredBuffer)
    );
  });

  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: 'Missing or invalid API key'
    });
  }

  return next();
}

module.exports = apiKeyAuth;
