const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/devices', dashboardController.getAllDevicesWithCredit);
router.get('/devices/:deviceID', dashboardController.getDeviceDetail);

module.exports = router;
