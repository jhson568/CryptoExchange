# CryptoExchange - Multi-Chain Wallet

A powerful, user-friendly cryptocurrency wallet supporting multiple blockchain networks including Ethereum, Bitcoin, Solana, Polygon, BSC, and more.

## Features

✨ **Multi-Chain Support**
- Ethereum (Mainnet)
- Bitcoin (Mainnet)
- Solana (Mainnet)
- Polygon (Mainnet)
- Binance Smart Chain (Mainnet)

🔐 **Security**
- Create new wallets with secure seed phrases (BIP39)
- Import existing wallets using seed phrases
- No private keys stored on servers
- Local-only wallet management

💰 **Core Features**
- View balances across all chains
- Send and receive cryptocurrency
- Transaction history tracking
- MetaMask integration support
- Real-time balance updates

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/jhson568/CryptoExchange.git
cd CryptoExchange
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your RPC endpoints
```

4. Start the application
```bash
# Development mode (runs both client and server)
npm run dev

# Or separately:
# Terminal 1 - Frontend
npm start

# Terminal 2 - Backend
npm run server
```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

### Create a New Wallet
1. Click "Create Wallet"
2. Generate a new seed phrase
3. **IMPORTANT**: Save your seed phrase in a secure location
4. Confirm you've saved it and create your wallet
5. Your wallet is ready to use!

### Import an Existing Wallet
1. Click "Import Wallet"
2. Enter your 12 or 24-word seed phrase
3. Your wallet will be restored with all accounts

### Send Funds
1. Select the blockchain network
2. Go to "Send Funds" tab
3. Enter recipient address and amount
4. Review and confirm the transaction
5. Transaction will be broadcast to the network

## API Endpoints

### Balance
- `POST /api/:chain/balance` - Get wallet balance

### Transactions
- `POST /api/:chain/send` - Send cryptocurrency
- `GET /api/:chain/transactions` - Get transaction history

## Environment Variables

See `.env.example` for all required RPC endpoints and configuration.

## Technology Stack

**Frontend:**
- React 18
- Ethers.js / Web3.js
- CSS3

**Backend:**
- Express.js
- Node.js

**Blockchain Libraries:**
- ethers.js
- bitcoinjs-lib
- @solana/web3.js
- bip39 (seed phrase generation)
- bip32 (HD wallet derivation)

## Security Considerations

⚠️ **Important**: This is a production-ready wallet. Always:
- Never share your seed phrase
- Keep your seed phrase backed up securely (write it down, hardware wallet, etc.)
- Never enter your seed phrase on untrusted websites
- Verify transaction details before confirming
- Use this on secure, trusted devices only

## Roadmap

- [ ] DeFi integration (Uniswap, Curve, etc.)
- [ ] NFT support and viewing
- [ ] Hardware wallet support (Ledger, Trezor)
- [ ] Token swapping
- [ ] Advanced transaction features (gas estimation, etc.)
- [ ] Mobile app

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open a GitHub issue.

## Disclaimer

This wallet is provided as-is. Users are responsible for securing their seed phrases and private keys. The developers are not responsible for lost funds.
