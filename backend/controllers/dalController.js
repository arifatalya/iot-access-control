const { getContract } = require('../config/fabric');

const getActivityByDevice = async (req, res) => {
  try {
    const contract = getContract('dal');
    const result = await contract.evaluateTransaction('GetActivityByDevice', req.params.deviceID);
    const resultStr = Buffer.from(result).toString('utf8');
    res.json(resultStr ? JSON.parse(resultStr) : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRecentActivities = async (req, res) => {
  try {
    const contract = getContract('dal');
    const result = await contract.evaluateTransaction('GetRecentActivities', req.params.limit);
    const resultStr = Buffer.from(result).toString('utf8');
    res.json(resultStr ? JSON.parse(resultStr) : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getActivityByID = async (req, res) => {
  try {
    const contract = getContract('dal');
    const result = await contract.evaluateTransaction('GetActivityByID', req.params.logID);
    res.json(JSON.parse(Buffer.from(result).toString('utf8')));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getActivityByDevice,
  getRecentActivities,
  getActivityByID
};
