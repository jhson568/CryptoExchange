import React, { useState, useEffect } from 'react';
import './styles/App.css';
import WalletCreator from './components/WalletCreator';
import WalletImporter from './components/WalletImporter';
import Dashboard from './components/Dashboard';

function App() {
  const [wallet, setWallet] = useState(null);
  const [activeTab, setActiveTab] = useState('create');

  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet');
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet));
      setActiveTab('dashboard');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('wallet');
    setWallet(null);
    setActiveTab('create');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>CryptoExchange - Multi-Chain Wallet</h1>
        <p>Support for Ethereum, Bitcoin, Solana, Polygon, BSC & More</p>
        {wallet && <button onClick={handleLogout}>Logout</button>}
      </header>

      <main className="app-main">
        {!wallet ? (
          <div className="auth-container">
            <div className="tab-buttons">
              <button
                className={activeTab === 'create' ? 'active' : ''}
                onClick={() => setActiveTab('create')}
              >
                Create Wallet
              </button>
              <button
                className={activeTab === 'import' ? 'active' : ''}
                onClick={() => setActiveTab('import')}
              >
                Import Wallet
              </button>
            </div>

            {activeTab === 'create' && (
              <WalletCreator onWalletCreated={setWallet} />
            )}
            {activeTab === 'import' && (
              <WalletImporter onWalletImported={setWallet} />
            )}
          </div>
        ) : (
          <Dashboard wallet={wallet} onLogout={handleLogout} />
        )}
      </main>
    </div>
  );
}

export default App;
