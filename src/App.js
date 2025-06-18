import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultTable from './components/ResultTable';
import { predictCalls } from './utils/callPredictor';
import './styles/ComicStyle.css'; // for consistent theming
import './styles/Footer.css';     // add this for footer styling

function App() {
  const [predictions, setPredictions] = useState(null);

  const handlePrediction = (formData) => {
    const result = predictCalls(formData);
    setPredictions(result);
  };

  const handleReset = () => {
    setPredictions(null);
  };

  return (
    <div className="app-wrapper">
      <main className="main-content">
        <h1 className="comic-title">IIM Call Predictor</h1>
        {!predictions ? (
          <InputForm onSubmit={handlePrediction} />
        ) : (
          <ResultTable predictions={predictions} onReset={handleReset} />
        )}
      </main>
      
      <div className="footer-badge">
        Built with ❤️ by Paav • No data stored 🛡️
      </div>
    </div>
  );
}


export default App;
