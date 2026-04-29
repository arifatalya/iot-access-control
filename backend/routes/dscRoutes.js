const express = require('express');
const router = express.Router();
const dscController = require('../controllers/dscController');
router.get('/:deviceID', dscController.getDeviceStatus);
router.post('/:deviceID/override', dscController.overrideStatus);
router.post('/:deviceID/reset', dscController.resetDeviceScore);
module.exports = router;
