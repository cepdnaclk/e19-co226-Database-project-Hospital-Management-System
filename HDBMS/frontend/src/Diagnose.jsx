import React, { useState } from 'react';
import axios from 'axios';
import './Diagnose.css'; // Import the CSS file for styles


function Diagnose() {
  const [treatDetails, setTreatDetails] = useState({
    P_ID: '',
    DOC_ID: '',
    Disease_Details: '',

  });

  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the Treat details to the backend API
    axios
      .post('http://localhost:8081/diagnose',treatDetails) 
      .then((response) => {
        console.log(response.data);
        if (response.data.Status === 'Success') {
          setMessage('Treat details added successfully.');
        } else {
          setMessage(response.data.Error);
        }
      })
      .catch((error) => {
        console.error('Error adding Treat details:', Error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTreatDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="treat-deatail-container">
      <h4>Add Patient Diagnose Details</h4>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Patient ID :</label>
            <input
              type="text"
              name="P_ID"
              value={treatDetails.P_ID}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Doctor ID:</label>
            <input
              type="text"
              name="DOC_ID"
              value={treatDetails.DOC_ID}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div> 

        <div className="form-group">
          <label>Diagnose details:</label>
          <textarea
            name="Disease_Details"
            value={treatDetails.Disease_Details}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Details
        </button>
        <div className="text-success">
            {message && <b>{message}</b>}
        </div>
      </form>
    </div>
  );
}

export default Diagnose;
