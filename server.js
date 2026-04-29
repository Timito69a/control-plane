import "./core/control.js";
const express = require('express');
const path = require('path');

const app = express();
const PORT = 8787;

// Static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use('/core', express.static(path.join(__dirname, 'core')));
app.use('/modules', express.static(path.join(__dirname, 'modules')));
app.use('/brain', express.static(path.join(__dirname, 'brain')));
app.use('/api', express.static(path.join(__dirname, 'api')));

// Health check
app.get('/api/state', (req, res) => {
  res.json({ status: 'ok', ts: Date.now() });
});

// Fallback → immer Dashboard
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard31-konsole.html'));
});

app.listen(PORT, () => {
  console.log("CONTROLPLANE CENTRAL BRAIN FRAMEWORK " + PORT);
});
