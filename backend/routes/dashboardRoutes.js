const express = require('express');
const router = express.Router();
const { getAllDevicesWithCredit, getDeviceDetail } = require('../controllers/dashboardController');

router.get('/devices', getAllDevicesWithCredit);
router.get('/devices/:deviceID', getDeviceDetail);

module.exports = router;