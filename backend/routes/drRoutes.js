const express = require('express');
const router = express.Router();
const drController = require('../controllers/drController');
router.post('/register', drController.registerDevice);
router.get('/', drController.getAllDevices);
router.get('/:deviceID', drController.getDevice);
router.put('/:deviceID', drController.updateDevice);
router.put('/:deviceID/status', drController.updateDeviceStatus);
module.exports = router;
