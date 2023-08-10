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
    R_Number: '',
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
      <h4><b>Add New Patient</b></h4>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group ">
            <label><b>Patient ID:</b></label>
            <input
              type="text"
              name="P_ID"
              value={patient.P_ID}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group ">
            <label><b>Name:</b></label>
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
            <label><b>Gender:</b></label>
            <select
              name="Gender"
              value={patient.Gender}
              onChange={handleChange}
              className="form-control"
            >
              <option value=""><b>Select</b></option>
              <option value="Male"><b>Male</b></option>
              <option value="Female"><b>Female</b></option>
              <option value="Other"><b>Other</b></option>
            </select>
          </div>
          <div className="form-group">
            <label><b>Contact Number:</b></label>
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
          <label><b>Address:</b></label>
          <textarea
            name="Address"
            value={patient.Address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-row">
          <div className="form-group ">
            <label><b>Email:</b></label>
            <input
              type="email"
              name="Email"
              value={patient.Email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group ">
            <label><b>R_Number:</b></label>
            <input
              type="text"
              name="R_Number"
              value={patient.R_Number}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label><b>REP_ID:</b></label>
          <input
            type="text"
            name="REP_ID"
            value={patient.REP_ID}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#042e5b', color: 'white' }}>
        <b>Add Patient</b>
        </button>

        <div className='text-success'>
                {message && <b>{message}</b>}
        </div>

        
      </form>
    </div>
  );
}

export default AddPatient