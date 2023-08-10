import React, { useState } from 'react';
import axios from 'axios';
import './AddReceptionist.css'; // Import the CSS file for styles


function AddReceptionist() {
  const [Receptionist, setReceptionist] = useState({
    REP_ID: '',
    Name: '',
    Gender: '',
    ContactNumber:'',
    Address: '',
    Email: '',
  });

  const [message,setMessage] =useState('')


  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the Receptionist data to the backend API
    axios
      .post('http://localhost:8081/addReceptionist', Receptionist)
      .then((response) => {
        console.log(response.data);
        if (response.data.Status === 'Success') {
          setMessage('Receptionist added successfully.');
          
        } else {
          setMessage(response.data.Error);
        }
      })
      .catch((error) => {
        console.error('Error adding Receptionist:', Error);
        
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReceptionist((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="add-Receptionist-container">
      <h4>Add new Receptionist </h4>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group ">
            <label>REP_ID:</label>
            <input
              type="text"
              name="REP_ID"
              value={Receptionist.REP_ID}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group ">
            <label>Name:</label>
            <input
              type="text"
              name="Name"
              value={Receptionist.Name}
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
              value={Receptionist.Gender}
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
              value={Receptionist.ContactNumber}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="Address"
            value={Receptionist.Address}
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
              value={Receptionist.Email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
        </div>
        
        <button type="submit" className="btn btn-primary">
          Add Receptionist
        </button>
        <div className='text-success'>
                {message && <b>{message}</b>}
        </div>

        
      </form>
    </div>
  );
}

export default AddReceptionist;