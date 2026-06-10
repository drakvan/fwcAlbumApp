const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE    = path.join(__dirname, 'data.json');
const COMPARE_FILE = path.join(__dirname, 'compare.json');

function readJSON(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sticker state
app.get('/api/state', (req, res) => res.json(readJSON(DATA_FILE, {})));
app.post('/api/state', (req, res) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(req.body));
  res.json({ ok: true });
});

// Compare history
app.get('/api/compare', (req, res) => res.json(readJSON(COMPARE_FILE, [])));
app.post('/api/compare', (req, res) => {
  const entries = readJSON(COMPARE_FILE, []);
  const entry = { id: Date.now().toString(), ...req.body };
  entries.unshift(entry);
  fs.writeFileSync(COMPARE_FILE, JSON.stringify(entries));
  res.json(entry);
});
app.delete('/api/compare/:id', (req, res) => {
  const entries = readJSON(COMPARE_FILE, []).filter(e => e.id !== req.params.id);
  fs.writeFileSync(COMPARE_FILE, JSON.stringify(entries));
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`FWC 2026 Album running at http://localhost:${PORT}`);
});
