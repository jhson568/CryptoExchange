import React, { useState } from 'react';
import { importWalletFromSeed, validateSeedPhrase } from '../services/walletService';
import '../styles/WalletImporter.css';

function WalletImporter({ onWalletImported }) {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImportWallet = async () => {
    setError('');

    if (!seedPhrase.trim()) {
      setError('Please enter your seed phrase');
      return;
    }

    if (!validateSeedPhrase(seedPhrase.trim())) {
      setError('Invalid seed phrase. Please check and try again.');
      return;
    }

    try {
      setLoading(true);
      const wallet = importWalletFromSeed(seedPhrase.trim());
      localStorage.setItem('wallet', JSON.stringify(wallet));
      onWalletImported(wallet);
    } catch (error) {
      setError('Error importing wallet: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-importer">
      <h2>Import Wallet with Seed Phrase</h2>
      <p className="info">Enter your 12 or 24-word seed phrase to import your wallet</p>

      <textarea
        value={seedPhrase}
        onChange={(e) => setSeedPhrase(e.target.value)}
        placeholder="Enter your seed phrase (space-separated words)"
        rows="6"
        className="seed-input"
      />

      {error && <p className="error-message">{error}</p>}

      <button
        onClick={handleImportWallet}
        disabled={loading}
        className="btn-primary"
      >
        {loading ? 'Importing...' : 'Import Wallet'}
      </button>
    </div>
  );
}

export default WalletImporter;
