import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import BalanceViewer from './BalanceViewer';
import SendFunds from './SendFunds';
import TransactionHistory from './TransactionHistory';

function Dashboard({ wallet, onLogout }) {
  const [activeTab, setActiveTab] = useState('balances');
  const [selectedChain, setSelectedChain] = useState('ethereum');

  const chains = Object.keys(wallet.chains);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="chain-selector">
          <label>Select Chain:</label>
          <select
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
          >
            {chains.map((chain) => (
              <option key={chain} value={chain}>
                {chain.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="tab-buttons">
        <button
          className={activeTab === 'balances' ? 'active' : ''}
          onClick={() => setActiveTab('balances')}
        >
          Balances
        </button>
        <button
          className={activeTab === 'send' ? 'active' : ''}
          onClick={() => setActiveTab('send')}
        >
          Send Funds
        </button>
        <button
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          Transaction History
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'balances' && (
          <BalanceViewer
            wallet={wallet}
            selectedChain={selectedChain}
          />
        )}
        {activeTab === 'send' && (
          <SendFunds
            wallet={wallet}
            selectedChain={selectedChain}
          />
        )}
        {activeTab === 'history' && (
          <TransactionHistory selectedChain={selectedChain} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
