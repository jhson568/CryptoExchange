import React, { useState, useEffect } from 'react';
import '../styles/TransactionHistory.css';

function TransactionHistory({ selectedChain }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [selectedChain]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      // Placeholder - implement actual transaction fetching from APIs
      setTransactions([]);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-history">
      <h3>{selectedChain.toUpperCase()} Transaction History</h3>

      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="empty-message">No transactions found</p>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Hash</th>
              <th>To/From</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash}>
                <td><code>{tx.hash}</code></td>
                <td>{tx.toFrom}</td>
                <td>{tx.amount}</td>
                <td>{tx.status}</td>
                <td>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={fetchTransactions} disabled={loading}>
        Refresh
      </button>
    </div>
  );
}

export default TransactionHistory;
