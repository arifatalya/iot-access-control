const { getContract } = require('../config/fabric');

const registerDevice = async (req, res) => {
  try {
    const { deviceID, deviceName, deviceType, macAddress, ipAddress, publicKey, org, owner, location } = req.body;

    const drContract = getContract('dr');
    await drContract.submitTransaction('RegisterDevice',
      deviceID, deviceName, deviceType, macAddress, ipAddress, publicKey, org, owner, location
    );

    const dscContract = getContract('dsc');
    await dscContract.submitTransaction('InitDeviceStatus', deviceID);

    res.json({ success: true, message: `Device ${deviceID} registered and credit score initialized` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllDevices = async (req, res) => {
  try {
    const contract = getContract('dr');
    const result = await contract.evaluateTransaction('GetAllDevices');
    res.json(JSON.parse(result.toString()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDevice = async (req, res) => {
  try {
    const contract = getContract('dr');
    const result = await contract.evaluateTransaction('GetDevice', req.params.deviceID);
    res.json(JSON.parse(result.toString()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDevice = async (req, res) => {
  try {
    const { deviceName, deviceType, ipAddress, location } = req.body;
    const contract = getContract('dr');
    await contract.submitTransaction('UpdateDevice',
      req.params.deviceID, deviceName, deviceType, ipAddress, location
    );
    res.json({ success: true, message: `Device ${req.params.deviceID} updated` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDeviceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contract = getContract('dr');
    await contract.submitTransaction('UpdateDeviceStatus', req.params.deviceID, status);
    res.json({ success: true, message: `Device ${req.params.deviceID} status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerDevice, getAllDevices, getDevice, updateDevice, updateDeviceStatus };
