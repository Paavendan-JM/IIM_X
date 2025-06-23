// components/InstructionModal.jsx
import React from 'react';
import './InstructionModal.css';

const InstructionModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content comic-box">
        <h2 className="comic-heading">📘 Instructions</h2>
        <ol className="comic-list">
          <ul className="comic-list"><br></br>
            <h9 className="comic-heading">Website Disclaimer:</h9>
            <li>All predictions are based on publicly available past year data and cutoff trends.</li>
            <li>This tool does <strong>not store any data</strong> — your inputs remain private.</li>
            <li>The predictions are for <strong>informational purposes only</strong> and not a guarantee of actual results.</li>
            <li>The logic and weightages used may <strong>differ from official IIM criteria</strong>, which are often dynamic and institute-specific.</li>
<br></br>
            <h9 className="comic-heading">Profile Logic:</h9>
            <li>Seat predictions assume the candidate has <strong>cleared the initial shortlist (Call)</strong> and is eligible for PI/WAT.</li>
            <li>A profile may have a <strong>low call probability</strong> but a <strong>high seat possibility</strong> if shortlisted, due to strong PI/WAT and reservation-based merit dynamics.</li>
            <li>Certifications like <strong>CA/CS/CMA</strong>, gender, academic background, and work experience are considered for diversity and resume score.</li>
            <li>A higher performance in <strong>PI/WAT rounds</strong> can significantly boost seat chances, even with lower CAT scores.</li>
            </ul>
        </ol>
        <button className="comic-button" onClick={onClose}>
          ❌ Close
        </button>
      </div>
    </div>
  );
};

export default InstructionModal;
