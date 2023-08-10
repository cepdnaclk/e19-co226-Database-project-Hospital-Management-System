import React, { useState } from 'react';
import axios from 'axios';
import './Room.css'; // Import the CSS file for styles


function Room() {
  const [Rdetail, setRdetail] = useState({
    R_Number: '',
    P_ID: '',
    exit_date: '',
  });

  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the Treat details to the backend API
    axios
      .post('http://localhost:8081/room',  Rdetail) 
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
    setRdetail((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="r-deatail-container">
      <h4>Add Room Details</h4>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Room Number:</label>
            <input
              type="text"
              name="R_Number"
              value={Rdetail.R_Number}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Patient ID:</label>
            <input
              type="text"
              name="P_ID"
              value={Rdetail.P_ID}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Exit Date:</label>
            <input
              type="date"
              name="exit_date"
              value={Rdetail.exit_date}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div> 

        <button type="submit" className="btn btn-primary">
          Add Room Details
        </button>
        <div className="text-success">
            {message && <b>{message}</b>}
        </div>
      </form>
    </div>
  );
}

export default Room;
