const express = require('express');
const router = express.Router();
const { registerDevice, getDevice, getAllDevices, updateDevice, updateDeviceStatus } = require('../controllers/drController');

router.post('/register', registerDevice);
router.get('/', getAllDevices);
router.get('/:deviceID', getDevice);
router.put('/:deviceID', updateDevice);
router.put('/:deviceID/status', updateDeviceStatus);

module.exports = router;
