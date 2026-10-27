const router = require('express').Router();

const D = require('../controllers/donationController');
const F = require('../controllers/funeralController');
const A = require('../controllers/awarenessController');

const apiKeyAuth = require('../middleware/apiKeyAuth');
const apiRateLimiter = require('../middleware/apiRateLimit');

// Protect all partner API endpoints.
router.use(apiKeyAuth);
router.use(apiRateLimiter);

router.get('/funeral-projects/:id/contributions', D.getContributionsForContract);
router.get('/memorials', F.getMemorialsForContract);
router.get('/gbv-affected-areas', F.getGBVAffectedAreasForContract);
router.get('/memorial-events', F.getMemorialEventsForContract);
router.get('/memorials/updates', F.getMemorialUpdatesForContract);

router.post('/awareness-activities', A.createAwarenessActivity);

module.exports = router;
