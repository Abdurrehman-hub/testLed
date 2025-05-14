const express = require("express");
const axios = require("axios");
const app = express();

const WLED_URL = "http://192.168.8.141/json/state";

function sendToWLED(payload, effectName, res) {
  axios
    .post(WLED_URL, payload, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      res.send(`${effectName} sent. Status: ${response.status}`);
    })
    .catch((error) => {
      res.send(`Error: ${error.message}`);
    });
}

// 🔷 Overlay Chase (/click)
app.get("/click", (req, res) => {
  const payload = {
    on: true,
    bri: 50,
    mainseg: 0,
    seg: [
      {
        id: 0, start: 0, stop: 300,
        col: [[0, 0, 255], [255, 69, 0]],
        fx: 47, sx: 255, ix: 255,
      },
      {
        id: 1, start: 300, stop: 600,
        col: [[0, 0, 255], [255, 69, 0]],
        fx: 47, sx: 255, ix: 255,
      },
    ],
  };
  sendToWLED(payload, "Overlay Chase", res);
});

// 🟧 Solid Orange (/home)
app.get("/home", (req, res) => {
  const payload = {
    on: true,
    bri: 50,
    mainseg: 0,
    seg: [
      {
        id: 0, start: 0, stop: 300,
        col: [[255, 69, 0]],
        fx: 0,
      },
      {
        id: 1, start: 300, stop: 600,
        col: [[255, 69, 0]],
        fx: 0,
      },
    ],
  };
  sendToWLED(payload, "Solid Orange", res);
});

// 🔵 Blink Blue (/win)
app.get("/win", (req, res) => {
  const payload = {
    on: true,
    bri: 50,
    mainseg: 0,
    seg: [
      {
        id: 0, start: 0, stop: 300,
        col: [[0, 0, 255]],
        fx: 1, sx: 240, ix: 120,
      },
      {
        id: 1, start: 300, stop: 600,
        col: [[0, 0, 255]],
        fx: 1, sx: 240, ix: 120,
      },
    ],
  };
  sendToWLED(payload, "Blink Blue", res);
});

// 🔴 Fade Red (/lose)
app.get("/lose", (req, res) => {
  const payload = {
    on: true,
    bri: 50,
    mainseg: 0,
    seg: [
      {
        id: 0, start: 0, stop: 300,
        col: [[255, 0, 0]],
        fx: 56, sx: 255, ix: 255,
      },
      {
        id: 1, start: 300, stop: 600,
        col: [[255, 0, 0]],
        fx: 56, sx: 255, ix: 255,
      },
    ],
  };
  sendToWLED(payload, "Fade Red", res);
});

// 🌀 Loading Overlay (/load)
app.get("/load", (req, res) => {
  const payload = {
    on: true,
    bri: 50,
    mainseg: 0,
    seg: [
      {
        id: 0, start: 0, stop: 300,
        col: [[0, 0, 255], [255, 69, 0]],
        fx: 47, sx: 30, ix: 255,
      },
      {
        id: 1, start: 300, stop: 600,
        col: [[0, 0, 255], [255, 69, 0]],
        fx: 47, sx: 30, ix: 255,
      },
    ],
  };
  sendToWLED(payload, "Loading Effect", res);
});

app.listen(5000, () => {
  console.log("WLED server running on http://localhost:5000");
});
