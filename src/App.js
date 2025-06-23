// App.js
import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultTable from './components/ResultTable';
import InstructionModal from './components/InstructionModal';
import { predictCalls } from './utils/callPredictor';
import { predictSeats } from './utils/seatPredictor';
import './styles/ComicStyle.css';
import './styles/Footer.css';
import './components/InstructionModal.css'; // import modal styles

function App() {
  const [resultRows, setResultRows] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleSubmit = (formData) => {
    const callResults = predictCalls(formData);
    const seatResults = predictSeats(formData);

    const mergedResults = callResults.map(callEntry => {
      const seatEntry = seatResults.find(s => s.iim === callEntry.iim);
      return {
        iim: callEntry.iim,
        call: callEntry.call,
        seat: seatEntry?.seat || {},
      };
    });

    setResultRows(mergedResults);
  };

  const handleReset = () => {
    setResultRows(null);
  };

  return (
    <div className="app-wrapper">
      <main className="main-content">
        <h1 className="comic-title">IIM Call Predictor</h1>
        
        {!resultRows ? (
          <InputForm onSubmit={handleSubmit} />
        ) : (
          <>
            <ResultTable predictions={resultRows} onReset={handleReset} onShowInstructions={() => setShowInstructions(true)} />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            </div>
          </>
        )}
      </main>

      <div className="footer-badge">
        Built with ❤️ by Paav • No data stored 🛡️
      </div>

      {showInstructions && <InstructionModal onClose={() => setShowInstructions(false)} />}
    </div>
  );
}

export default App;
