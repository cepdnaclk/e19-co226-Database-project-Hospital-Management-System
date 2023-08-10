import React, { useState } from 'react';
import axios from 'axios';
import './Treat.css'; // Import the CSS file for styles


function Diagnose() {
  const [Tdetails, setTdetails] = useState({
    P_ID: '',
    NR_ID: '',
    Given_Medicine: '',

  });

  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the Treat details to the backend API
    axios
      .post('http://localhost:8081/treat',  Tdetails) 
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
    setTdetails((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="t-deatail-container">
      <h4>Add Patient Treat Details</h4>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Patient ID :</label>
            <input
              type="text"
              name="P_ID"
              value={Tdetails.P_ID}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Nurse ID:</label>
            <input
              type="text"
              name="NR_ID"
              value={Tdetails.NR_ID}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div> 

        <div className="form-group">
          <label>Given Medicine:</label>
          <textarea
            name="Given_Medicine"
            value={Tdetails.Given_Medicine}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Treat Details
        </button>
        <div className="text-success">
            {message && <b>{message}</b>}
        </div>
      </form>
    </div>
  );
}

export default Diagnose;
