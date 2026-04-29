const express = require('express');
const cors = require('cors');
const { initGateway } = require('./config/fabric');

// Routes
const drRoutes = require('./routes/drRoutes');
const dalRoutes = require('./routes/dalRoutes');
const dscRoutes = require('./routes/dscRoutes');
const doRoutes = require('./routes/doRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/devices', drRoutes);
app.use('/api/activities', dalRoutes);
app.use('/api/credit', dscRoutes);
app.use('/api/operations', doRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = 3001;

initGateway()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Dashboard backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to Fabric:', err);
    process.exit(1);
  });
