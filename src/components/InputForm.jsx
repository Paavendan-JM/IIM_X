import React, { useState } from 'react';
import './InputForm.css';

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    varcScore: '', dilrScore: '', qaScore: '', overallScore: '',
    varc: '', dilr: '', qa: '', overall: '',
    class10: '', class12: '', graduation: '',
    category: '', gender: '', background: '', workex: '', hasCertification: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="comic-form" onSubmit={handleSubmit}>
      <h2 className="comic-heading">Enter Your Details</h2><br />
      <br></br>
      {/* CAT Scores */}
      <div className="form-row">
        <div className="form-group">
          <label>VARC Score</label>
          <input type="number" name="varcScore" value={formData.varcScore} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>DILR Score</label>
          <input type="number" name="dilrScore" value={formData.dilrScore} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>QA Score</label>
          <input type="number" name="qaScore" value={formData.qaScore} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Overall Score</label>
          <input type="number" name="overallScore" value={formData.overallScore} onChange={handleChange} required />
        </div>
      </div>
      {/* CAT Sectionals */}
      <div className="form-row">
        <div className="form-group">
          <label>VARC %</label>
          <input type="number" name="varc" value={formData.varc} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>DILR %</label>
          <input type="number" name="dilr" value={formData.dilr} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>QA %</label>
          <input type="number" name="qa" value={formData.qa} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Overall %</label>
          <input type="number" name="overall" value={formData.overall} onChange={handleChange} required />
        </div>
      </div>

      {/* Academics */}
      <div className="form-row">
        <div className="form-group">
          <label>10th %</label>
          <input type="number" name="class10" value={formData.class10} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>12th %</label>
          <input type="number" name="class12" value={formData.class12} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Grad %</label>
          <input type="number" name="graduation" value={formData.graduation} onChange={handleChange} required />
        </div>
      </div>

      {/* Dropdowns */}
      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="EWS">EWS</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
          </select>
        </div>
        <div className="form-group">
          <label>Background</label>
          <select name="background" value={formData.background} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="engineering">Engineering</option>
            <option value="non_engineering">Non-Engineering</option>
          </select>
        </div>
      </div>

      {/* Work Experience and Certifications */}
<div className="form-row">
  <div className="form-group">
    <label>Work Experience</label>
    <select name="workex" value={formData.workex} onChange={handleChange} required>
      <option value="">Select</option>
      <option value="<6">Less than 6 months</option>
      <option value="6-12">6 - 12 months</option>
      <option value="12-18">12 - 18 months</option>
      <option value="18-24">18 - 24 months</option>
      <option value="24-30">24 - 30 months</option>
      <option value="30-36">30 - 36 months</option>
      <option value="36+">36+ months</option>
    </select>
  </div>

  <div className="form-group">
    <label>CA/CS/CMA</label>
    <select name="hasCertification" value={formData.hasCertification} onChange={handleChange} required>
      <option value="">Select</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  </div>
</div>

      <div className="form-row" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <button className="comic-button" type="submit">Submit 🚀</button>
      </div>
    </form>
  );
};

export default InputForm;