import React, { useState } from 'react';
import axios from 'axios';
import './AddPatient.css';


function AddPatient() {
  const [patient, setPatient] = useState({
    P_ID: '',
    Name: '',
    Gender: '',
    ContactNumber: '',
    Address: '',
    Email: '',
    W_Number: '',
    REP_ID: '',
  });


  const [message,setMessage] =useState('')


  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the patient data to the backend API
    axios
      .post('http://localhost:8081/addPatient', patient)
      .then((response) => {
        console.log(response.data);
        if (response.data.Status === 'Success') {
          setMessage('Patient added successfully.');
          
        } else {
          setMessage(response.data.Error);
        }
      })
      .catch((error) => {
        console.error('Error adding patient:', Error);
        
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatient((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="add-patient-container">
      <h4>Add New Patient</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group ">
            <label>P_ID:</label>
            <input
              type="text"
              name="P_ID"
              value={patient.P_ID}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group ">
            <label>Name:</label>
            <input
              type="text"
              name="Name"
              value={patient.Name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group ">
            <label>Gender:</label>
            <select
              name="Gender"
              value={patient.Gender}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Contact Number:</label>
            <input
              type="text"
              name="ContactNumber"
              value={patient.ContactNumber}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="Address"
            value={patient.Address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-row">
          <div className="form-group ">
            <label>Email:</label>
            <input
              type="email"
              name="Email"
              value={patient.Email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group ">
            <label>W_Number:</label>
            <input
              type="text"
              name="W_Number"
              value={patient.W_Number}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label>REP_ID:</label>
          <input
            type="text"
            name="REP_ID"
            value={patient.REP_ID}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Patient
        </button>
        <div className='text-success'>
                {message && <b>{message}</b>}
        </div>

        
      </form>
    </div>
  );
}

export default AddPatient;
