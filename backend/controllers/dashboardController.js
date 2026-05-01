const { getContract } = require('../config/fabric');

const getAllDevicesWithCredit = async (req, res) => {
  try {
    const drContract = getContract('dr');
    const dscContract = getContract('dsc');
    const devicesRaw = await drContract.evaluateTransaction('GetAllDevices');
    const resultStr = Buffer.from(devicesRaw).toString('utf8');
    const devices = resultStr ? JSON.parse(resultStr) : [];
    const enriched = await Promise.all(devices.map(async (device) => {
      try {
        const statusRaw = await dscContract.evaluateTransaction('GetDeviceStatus', device.deviceID);
        const status = JSON.parse(Buffer.from(statusRaw).toString('utf8'));
        return { ...device, ...status };
      } catch {
        return { ...device, creditScore: null, trustCategory: 'Unknown', lastEvaluated: null };
      }
    }));
    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDeviceDetail = async (req, res) => {
  try {
    const drContract = getContract('dr');
    const dscContract = getContract('dsc');
    const dalContract = getContract('dal');

    const deviceRaw = await drContract.evaluateTransaction('GetDevice', req.params.deviceID);
    const device = JSON.parse(Buffer.from(deviceRaw).toString('utf8'));

    const statusRaw = await dscContract.evaluateTransaction('GetDeviceStatus', req.params.deviceID);
    const status = JSON.parse(Buffer.from(statusRaw).toString('utf8'));

    const activitiesRaw = await dalContract.evaluateTransaction('GetActivityByDevice', req.params.deviceID);
    const activitiesStr = Buffer.from(activitiesRaw).toString('utf8');
    const activities = activitiesStr ? JSON.parse(activitiesStr) : [];

    res.json({ ...device, ...status, activities });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllDevicesWithCredit,
  getDeviceDetail
};
