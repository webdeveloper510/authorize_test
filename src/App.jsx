import { useState } from 'react';
import './App.css';

function App() {
  const [cardNumber, setCardNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const authData = {
      clientKey: 'YOUR_CLIENT_KEY',       // Get from Authorize.Net
      apiLoginID: 'YOUR_API_LOGIN_ID',   // Get from Authorize.Net
    };

    const cardData = {
      cardNumber,
      month,
      year,
      cardCode: cvv,
      fullName,
    };

    const secureData = {
      authData,
      cardData,
    };

    if (window.Accept) {
      window.Accept.dispatchData(secureData, (response) => {
        if (response.messages.resultCode === 'Error') {
          setError(response.messages.message[0].text);
          setLoading(false);
        } else {
          const opaqueData = response.opaqueData;
          console.log('Send this to backend:', opaqueData);

          // 🚀 TODO: Send `opaqueData` to your backend to finalize the transaction
          setLoading(false);
        }
      });
    } else {
      setError('Accept.js not loaded.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      <input placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
      <input placeholder="MM" value={month} onChange={(e) => setMonth(e.target.value)} required />
      <input placeholder="YY" value={year} onChange={(e) => setYear(e.target.value)} required />
      <input placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Pay'}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default App;
