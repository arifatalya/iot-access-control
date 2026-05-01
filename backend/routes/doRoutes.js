const express = require('express');
const router = express.Router();
const { sendHeartbeat, requestAccess, transmitData, reportDeviceHealth } = require('../controllers/doController');

router.post('/heartbeat', sendHeartbeat);
router.post('/request-access', requestAccess);
router.post('/transmit-data', transmitData);
router.post('/health-report', reportDeviceHealth);

module.exports = router;
