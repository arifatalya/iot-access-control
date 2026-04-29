const { getContract } = require('../config/fabric');

const sendHeartbeat = async (req, res) => {
  try {
    const { deviceID } = req.body;
    const contract = getContract('do');
    await contract.submitTransaction('SendHeartbeat', deviceID);
    res.json({ success: true, message: `Heartbeat sent for ${deviceID}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const requestAccess = async (req, res) => {
  try {
    const { deviceID, requestID, targetResource } = req.body;
    const contract = getContract('do');
    await contract.submitTransaction('RequestAccess', deviceID, requestID, targetResource);
    res.json({ success: true, message: `Access granted for ${deviceID}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const transmitData = async (req, res) => {
  try {
    const { deviceID, requestID, payload } = req.body;
    const contract = getContract('do');
    await contract.submitTransaction('TransmitData', deviceID, requestID, payload);
    res.json({ success: true, message: `Data transmitted for ${deviceID}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const reportDeviceHealth = async (req, res) => {
  try {
    const { deviceID, cpuUsage, memUsage, uptime } = req.body;
    const contract = getContract('do');
    await contract.submitTransaction('ReportDeviceHealth',
      deviceID, cpuUsage.toString(), memUsage.toString(), uptime
    );
    res.json({ success: true, message: `Health report received for ${deviceID}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { sendHeartbeat, requestAccess, transmitData, reportDeviceHealth };
