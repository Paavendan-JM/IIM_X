import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultTable from './components/ResultTable';
import { predictCalls } from './utils/callPredictor';
import { predictSeats } from './utils/seatPredictor'; // make sure this file exists
import './styles/ComicStyle.css';
import './styles/Footer.css';

function App() {
  const [formData, setFormData] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [mode, setMode] = useState(null); // 'call' | 'seat'

  const handleFormSubmit = (data) => {
    setFormData(data);
    setPredictions(null);
    setMode(null);
  };

  const handlePredictCalls = () => {
    if (formData) {
      const result = predictCalls(formData);
      setPredictions(result);
      setMode('call');
    }
  };

  const handlePredictSeat = () => {
    if (formData) {
      const result = predictSeats(formData);
      setPredictions(result);
      setMode('seat');
    }
  };

  const handleReset = () => {
    setFormData(null);
    setPredictions(null);
    setMode(null);
  };

  return (
    <div className="app-wrapper">
      <main className="main-content">
        <h1 className="comic-title">IIM Call Predictor</h1>

        {!formData ? (
          <InputForm onSubmit={handleFormSubmit} />
        ) : !predictions ? (
          <div className="button-row" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button className="comic-button" onClick={handlePredictCalls}>🎯 Predict Calls</button>
            <button className="comic-button" onClick={handlePredictSeat}>📊 Predict Seat</button>
          </div>
        ) : (
          <ResultTable
            title={mode === 'call' ? "Call Probability by PI Performance" : "Seat Prediction Based on Composite Score"}
            predictions={predictions}
            onReset={handleReset}
          />
        )}
      </main>

      <div className="footer-badge">
        Built with ❤️ by Paav • No data stored 🛡️
      </div>
    </div>
  );
}

export default App;
