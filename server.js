const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'data.json');
const COMPARE_FILE = path.join(DATA_DIR, 'compare.json');

function readJSON(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
}

function writeJSON(file, data) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sticker state
app.get('/api/state', (req, res) => res.json(readJSON(DATA_FILE, {})));
app.post('/api/state', (req, res) => {
  writeJSON(DATA_FILE, req.body);
  res.json({ ok: true });
});

// Compare history
app.get('/api/compare', (req, res) => res.json(readJSON(COMPARE_FILE, [])));
app.post('/api/compare', (req, res) => {
  const entries = readJSON(COMPARE_FILE, []);
  const entry = { id: Date.now().toString(), ...req.body };
  entries.unshift(entry);
  writeJSON(COMPARE_FILE, entries);
  res.json(entry);
});
app.delete('/api/compare/:id', (req, res) => {
  const entries = readJSON(COMPARE_FILE, []).filter(e => e.id !== req.params.id);
  writeJSON(COMPARE_FILE, entries);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`FWC 2026 Album running at http://localhost:${PORT}`);
});
