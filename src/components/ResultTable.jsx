import React from 'react';
import './ResultTable.css';

const ResultTable = ({ predictions, onReset }) => {
  const levels = ['Low', 'Moderate', 'High'];

  return (
    <div className="result-container">
      <h2 className="comic-heading">Predictions based on PI Performance</h2>

      <table className="comic-table">
        <thead>
          <tr>
            <th>Colleges</th>
            {levels.map(level => (
              <th key={level}>{level}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {predictions.map(({ iim, result }) => (
            <tr key={iim}>
              <td>{iim}</td>
              {levels.map(level => (
                <td key={level} aria-label={level}>
                  {result[level] ? '✅' : '❌'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="reset-button-wrapper">
        <button onClick={onReset} className="comic-button">
          🔄 Try Again
        </button>
      </div>
    </div>
  );
};

export default ResultTable;
