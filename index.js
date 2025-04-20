const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// ✅ Blockchain class import
const Blockchain = require('./blockchain/blockchain');

// ✅ Create blockchain instance and add phishing URLs
const phishingChain = new Blockchain();
phishingChain.addBlock("http://bad.com");
phishingChain.addBlock("http://scam.com");

const app = express();
const PORT = 3001;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Default test route
app.get('/', (req, res) => {
  res.send('🚀 Backend is running successfully');
});

// ✅ Backend test API
app.get('/api/test', (req, res) => {
  res.json({ message: '🎯 Backend API working' });
});

// ✅ Blockchain Phishing URL Checker API
app.post('/api/check-url', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  if (phishingChain.isPhishing(url)) {
    res.json({ phishing: true, message: '⚠️ Phishing URL detected by Blockchain' });
  } else {
    res.json({ phishing: false, message: '✅ Safe URL (not found in blockchain)' });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
