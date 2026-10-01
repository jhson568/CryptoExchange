import React, { useState } from 'react';
import { generateSeedPhrase, createMultiChainWallet } from '../services/walletService';
import '../styles/WalletCreator.css';

function WalletCreator({ onWalletCreated }) {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [showSeed, setShowSeed] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerateSeed = () => {
    const seed = generateSeedPhrase();
    setSeedPhrase(seed);
  };

  const handleCreateWallet = async () => {
    if (!confirmed) {
      alert('Please confirm that you have saved your seed phrase');
      return;
    }

    try {
      setLoading(true);
      const wallet = createMultiChainWallet(seedPhrase);
      localStorage.setItem('wallet', JSON.stringify(wallet));
      onWalletCreated(wallet);
    } catch (error) {
      alert('Error creating wallet: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-creator">
      <h2>Create New Wallet</h2>
      <p className="warning">⚠️ Never share your seed phrase with anyone!</p>

      {!seedPhrase && (
        <button onClick={handleGenerateSeed} className="btn-primary">
          Generate Seed Phrase
        </button>
      )}

      {seedPhrase && (
        <div className="seed-display">
          <div className={`seed-phrase ${showSeed ? 'visible' : 'hidden'}`}>
            {showSeed ? seedPhrase : '••••••••••••••••••••••••'}
          </div>
          <button
            onClick={() => setShowSeed(!showSeed)}
            className="btn-secondary"
          >
            {showSeed ? 'Hide' : 'Show'} Seed Phrase
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(seedPhrase);
              alert('Seed phrase copied to clipboard!');
            }}
            className="btn-secondary"
          >
            Copy Seed Phrase
          </button>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            I have saved my seed phrase in a safe location
          </label>

          <button
            onClick={handleCreateWallet}
            disabled={!confirmed || loading}
            className="btn-primary"
          >
            {loading ? 'Creating...' : 'Create Wallet'}
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletCreator;
