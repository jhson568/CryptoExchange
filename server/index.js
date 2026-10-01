const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Ethereum endpoints
app.post('/api/ethereum/balance', async (req, res) => {
  // TODO: Implement balance fetching
  res.json({ balance: '0' });
});

app.post('/api/ethereum/send', async (req, res) => {
  // TODO: Implement send transaction
  res.json({ txHash: '' });
});

// Bitcoin endpoints
app.post('/api/bitcoin/balance', async (req, res) => {
  // TODO: Implement balance fetching
  res.json({ balance: '0' });
});

app.post('/api/bitcoin/send', async (req, res) => {
  // TODO: Implement send transaction
  res.json({ txHash: '' });
});

// Solana endpoints
app.post('/api/solana/balance', async (req, res) => {
  // TODO: Implement balance fetching
  res.json({ balance: '0' });
});

app.post('/api/solana/send', async (req, res) => {
  // TODO: Implement send transaction
  res.json({ txHash: '' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
