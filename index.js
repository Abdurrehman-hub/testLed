const express = require('express');
const axios = require('axios');
const app = express();

const WLED_IP = 'http://192.168.8.141/json/state'; // Replace with your actual WLED IP

// Function to send payload
async function sendToWled(payload, effectName) {
  try {
    const res = await axios.post(WLED_IP, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
    return `${effectName} sent successfully. Status: ${res.status}`;
  } catch (error) {
    return `Error sending ${effectName}: ${error.message}`;
  }
}

// 🔷 Overlay Chase
app.get('/click', async (req, res) => {
  const payload = {
    on: true,
    bri: 50,
    mainseg: 0,
    seg: [
      { id: 0, start: 0, stop: 300, col: [[0, 0, 255], [255, 69, 0]], fx: 47, sx: 255, ix: 255 },
      { id: 1, start: 300, stop: 600, col: [[0, 0, 255], [255, 69, 0]], fx: 47, sx: 255, ix: 255 }
    ]
  };
  res.send(await sendToWled(payload, "Overlay Chase"));
});

// 🟧 Solid Orange
app.get('/home', async (req, res) => {
  const payload = {
    on: true,
    bri: 50,
    mainseg: 0,
    seg: [
      { id: 0, start: 0, stop: 300, col: [[255, 69, 0]], fx: 0 },
      { id: 1, start: 300, stop: 600, col: [[255, 69, 0]], fx: 0 }
    ]
  };
  res.send(await sendToWled(payload, "Solid Orange"));
});

// 🔵 Blink Blue
app.get('/win', async (req, res) => {
  const payload = {
    on: true,
    bri: 50,
    mainseg: 0,
    seg: [
      { id: 0, start: 0, stop: 300, col: [[0, 0, 255]], fx: 1, sx: 240, ix: 120 },
      { id: 1, start: 300, stop: 600, col: [[0, 0, 255]], fx: 1, sx: 240, ix: 120 }
    ]
  };
  res.send(await sendToWled(payload, "Blink Blue"));
});

// 🔴 Fade Red
app.get('/lose', async (req, res) => {
  const payload = {
    on: true,
    bri: 50,
    mainseg: 0,
    seg: [
      { id: 0, start: 0, stop: 300, col: [[255, 0, 0]], fx: 56, sx: 255, ix: 255 },
      { id: 1, start: 300, stop: 600, col: [[255, 0, 0]], fx: 56, sx: 255, ix: 255 }
    ]
  };
  res.send(await sendToWled(payload, "Fade Red"));
});

// 🌀 Loading Effect
app.get('/load', async (req, res) => {
  const payload = {
    on: true,
    bri: 50,
    mainseg: 0,
    seg: [
      { id: 0, start: 0, stop: 300, col: [[0, 0, 255], [255, 69, 0]], fx: 47, sx: 30, ix: 255 },
      { id: 1, start: 300, stop: 600, col: [[0, 0, 255], [255, 69, 0]], fx: 47, sx: 30, ix: 255 }
    ]
  };
  res.send(await sendToWled(payload, "Loading Effect"));
});

// Optional: Power Off Endpoint
app.get('/off', async (req, res) => {
  const payload = {
    on: false
  };
  res.send(await sendToWled(payload, "Power Off"));
});

// Start server — use Render's dynamic port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
