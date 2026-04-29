const express = require('express');
const router = express.Router();
const dalController = require('../controllers/dalController');
router.get('/device/:deviceID', dalController.getActivityByDevice);
router.get('/recent/:limit', dalController.getRecentActivities);
router.get('/:logID', dalController.getActivityByID);
module.exports = router;
