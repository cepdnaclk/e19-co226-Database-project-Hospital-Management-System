import React, { useState } from 'react';
import axios from 'axios';
import './AddDoctor.css'; // Import the CSS file for styles


function AddDoctor() {
  const [Doctor, setDoctor] = useState({
    DOC_ID: '',
    Name: '',
    Gender: '',
    Specialization: '',
    ContactNumber:'',
    Address: '',
    Email: '',
  });


  const [message,setMessage] =useState('')


  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the Doctor data to the backend API
    axios
      .post('http://localhost:8081/addDoctor', Doctor)
      .then((response) => {
        console.log(response.data);
        if (response.data.Status === 'Success') {
          setMessage('Doctor added successfully.');
          
        } else {
          setMessage(response.data.Error);
        }
      })
      .catch((error) => {
        console.error('Error adding Doctor:', Error);
        
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDoctor((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="add-Doctor-container">
      <h4>Add new Doctor</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group ">
            <label>DOC_ID:</label>
            <input
              type="text"
              name="DOC_ID"
              value={Doctor.DOC_ID}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group ">
            <label>Name:</label>
            <input
              type="text"
              name="Name"
              value={Doctor.Name}
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
              value={Doctor.Gender}
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
            <label>Specialization:</label>
            <input
                type="text"
                name="Specialization"
                value={Doctor.Specialization}
                onChange={handleChange}
                className="form-control"
            />
        </div>
          <div className="form-group">
            <label>Contact Number:</label>
            <input
              type="text"
              name="ContactNumber"
              value={Doctor.ContactNumber}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="Address"
            value={Doctor.Address}
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
              value={Doctor.Email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
        </div>
        
        <button type="submit" className="btn btn-primary">
          Add Doctor
        </button>
        <div className='text-success'>
                {message && <b>{message}</b>}
        </div>

        
      </form>
    </div>
  );
}

export default AddDoctor;