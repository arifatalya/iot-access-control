const express = require('express');
const router = express.Router();
const doController = require('../controllers/doController');

router.post('/heartbeat', doController.sendHeartbeat);
router.post('/request-access', doController.requestAccess);
router.post('/transmit-data', doController.transmitData);
router.post('/health-report', doController.reportDeviceHealth);

module.exports = router;
