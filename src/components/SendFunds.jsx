import React, { useState } from 'react';
import '../styles/SendFunds.css';

function SendFunds({ wallet, selectedChain }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();

    if (!recipient || !amount) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setStatus('Preparing transaction...');
      
      // Placeholder - implement actual transaction sending
      // This would involve:
      // 1. Validating the recipient address
      // 2. Creating the transaction
      // 3. Signing with the private key
      // 4. Broadcasting to the network
      
      setStatus('Transaction sent! Check your address on a block explorer.');
      setRecipient('');
      setAmount('');
    } catch (error) {
      setStatus('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="send-funds">
      <h3>Send {selectedChain.toUpperCase()}</h3>
      
      <form onSubmit={handleSend}>
        <div className="form-group">
          <label>Recipient Address:</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter recipient address"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            step="0.0001"
            disabled={loading}
          />
        </div>

        {status && <p className="status-message">{status}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>

      <p className="warning">
        ⚠️ Always double-check recipient address before sending
      </p>
    </div>
  );
}

export default SendFunds;
