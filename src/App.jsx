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

  // const handlePayment = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //  const authData = {
  //       clientKey: '48qPmpuKgaEp5d6ReVZFm8D7WM4DR24WhdMc862e9u3DbdTAmQcb4S2e2937bc9A',
  //       apiLoginID: '4dBF93uzn',
  //     };

  //   const cardData = {
  //     cardNumber,
  //     month,
  //     year,
  //     cardCode: cvv,
  //     fullName,
  //   };

  //   const secureData = {
  //     authData,
  //     cardData,
  //   };

  //   if (window.Accept) {
  //     window.Accept.dispatchData(secureData, (response) => {
  //       console.log("response" , response)
  //       if (response.messages.resultCode === 'Error') {
  //         setError(response.messages.message[0].text);
  //         setLoading(false);
  //       } else {
  //         const opaqueData = response.opaqueData;
  //         console.log('Send this to backend:', opaqueData);

  //         // 🚀 TODO: Send `opaqueData` to your backend to finalize the transaction
  //         setLoading(false);
  //       }
  //     });
  //   } else {
  //     setError('Accept.js not loaded.');
  //     setLoading(false);
  //   }
  // };


  const handlePayment = (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const authData = {
    clientKey: '48qPmpuKgaEp5d6ReVZFm8D7WM4DR24WhdMc862e9u3DbdTAmQcb4S2e2937bc9A',  // e.g., 48qPmpuKgaEp5d6...
    apiLoginID: '4dBF93uzn', // e.g., 4dBF93uzn
  };


   


  const cardData = {
    cardNumber,     // e.g., '4111111111111111'
    month,          // e.g., '12'
    year,           // e.g., '2026'
    cardCode: cvv,  // e.g., '123'
    fullName,       // e.g., 'John Doe'
  };

  const secureData = {
    authData,
    cardData,
  };

  if (!window.Accept) {
  console.error('Accept.js not loaded');
}

  if (window.Accept) {
    window.Accept.dispatchData(secureData, (response) => {
      console.log("response", response);
      if (response.messages.resultCode === 'Error') {
        setError(response.messages.message[0].text);
        setLoading(false);
      } else {
        const opaqueData = response.opaqueData;
        console.log('Send this to backend:', opaqueData);

        // ✅ Now you send opaqueData to your backend to charge the card
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
