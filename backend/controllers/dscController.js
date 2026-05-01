const { getContract } = require('../config/fabric');

const getDeviceStatus = async (req, res) => {
  try {
    const contract = getContract('dsc');
    const result = await contract.evaluateTransaction('GetDeviceStatus', req.params.deviceID);
    res.json(JSON.parse(Buffer.from(result).toString('utf8')));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const overrideStatus = async (req, res) => {
  try {
    const contract = getContract('dsc');
    await contract.submitTransaction('OverrideStatus', req.params.deviceID);
    res.json({ success: true, message: `Device ${req.params.deviceID} overridden to Malicious` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const resetDeviceScore = async (req, res) => {
  try {
    const contract = getContract('dsc');
    await contract.submitTransaction('ResetDeviceScore', req.params.deviceID);
    res.json({ success: true, message: `Device ${req.params.deviceID} reset to Suspicious (score 50)` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getDeviceStatus,
  overrideStatus,
  resetDeviceScore
};
