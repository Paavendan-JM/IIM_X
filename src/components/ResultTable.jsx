import React from 'react';
import './ResultTable.css';

const ResultTable = ({ predictions, onReset, onShowInstructions }) => {
  return (
    <div className="result-container">
      <h2 className="comic-heading">Final Prediction Result</h2>
      <table className="comic-table">
        <thead>
          <tr>
            <th rowSpan="2">IIM</th>
            <th rowSpan="2">Call Possibility</th>
            <th colSpan="3">Seat Possibility</th>
          </tr>
          <tr>
            <th>Average</th>
            <th>Good</th>
            <th>Excellent</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map(({ iim, call, seat }) => (
            <tr key={iim}>
              <td>{iim}</td>
              <td>{call}</td>
              <td>{seat?.Average || '-'}</td>
              <td>{seat?.Good || '-'}</td>
              <td>{seat?.Excellent || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-row" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        <button onClick={onReset} className="comic-button">
          🔄 Try Again
        </button>
        <button onClick={onShowInstructions} className="comic-button">
          📘 Instructions
        </button>
      </div>
    </div>
  );
};

export default ResultTable;