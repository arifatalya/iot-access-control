const express = require('express');
const router = express.Router();
const { getDeviceStatus, overrideStatus, resetDeviceScore } = require('../controllers/dscController');

router.get('/:deviceID', getDeviceStatus);
router.post('/:deviceID/override', overrideStatus);
router.post('/:deviceID/reset', resetDeviceScore);

module.exports = router;
