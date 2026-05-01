const express = require('express');
const router = express.Router();
const { getActivityByDevice,getRecentActivities, getActivityByID } = require('../controllers/dalController');

router.get('/device/:deviceID', getActivityByDevice);
router.get('/recent/:limit', getRecentActivities);
router.get('/:logID', getActivityByID);

module.exports = router;
