import React, { useState, useEffect } from 'react';
import '../styles/BalanceViewer.css';

function BalanceViewer({ wallet, selectedChain }) {
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(false);

  const chainAddress = wallet.chains[selectedChain]?.address;

  useEffect(() => {
    fetchBalance();
  }, [selectedChain]);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      // Placeholder - implement actual balance fetching from APIs
      setBalances({
        native: '0.00',
        usd: '$0.00',
      });
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="balance-viewer">
      <h3>{selectedChain.toUpperCase()} Wallet</h3>
      
      <div className="address-display">
        <p><strong>Address:</strong></p>
        <code>{chainAddress}</code>
        <button
          onClick={() => {
            navigator.clipboard.writeText(chainAddress);
            alert('Address copied!');
          }}
        >
          Copy
        </button>
      </div>

      <div className="balance-display">
        <div className="balance-item">
          <label>Balance:</label>
          <p className="balance-value">{loading ? 'Loading...' : balances.native}</p>
        </div>
        <div className="balance-item">
          <label>USD Value:</label>
          <p className="balance-usd">{loading ? 'Loading...' : balances.usd}</p>
        </div>
      </div>

      <button onClick={fetchBalance} disabled={loading}>
        Refresh Balance
      </button>
    </div>
  );
}

export default BalanceViewer;
