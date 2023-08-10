import React, { useState } from 'react';
import axios from 'axios';
import './AddNurse.css'; // Import the CSS file for styles


function AddNurse() {
  const [Nurse, setNurse] = useState({
    NR_ID: '',
    Name: '',
    ContactNumber: '',
    Address: '',
    Email:'',
    Gender: '',
  });

  const [message,setMessage] =useState('')


  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the Nurse data to the backend API
    axios
      .post('http://localhost:8081/addNurse', Nurse)
      .then((response) => {
        console.log(response.data);
        if (response.data.Status === 'Success') {
          setMessage('Nurse added successfully.');
          
        } else {
          setMessage(response.data.Error);
        }
      })
      .catch((error) => {
        console.error('Error adding Nurse:', Error);
        
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNurse((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="add-Nurse-container">
      <h4>Add new Nurse</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group ">
            <label>NR_ID:</label>
            <input
              type="text"
              name="NR_ID"
              value={Nurse.NR_ID}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group ">
            <label>Name:</label>
            <input
              type="text"
              name="Name"
              value={Nurse.Name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Contact Number:</label>
            <input
              type="text"
              name="ContactNumber"
              value={Nurse.ContactNumber}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea
                name="Address"
                value={Nurse.Address}
                onChange={handleChange}
                className="form-control"
            />
        </div>
        </div>

        <div className="form-row">
          <div className="form-group ">
            <label>Email:</label>
            <input
              type="email"
              name="Email"
              value={Nurse.Email}
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
              value={Nurse.Gender}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
         
        </div>
        
        
        
        <button type="submit" className="btn btn-primary">
          Add Nurse
        </button>
        <div className='text-success'>
                {message && <b>{message}</b>}
        </div>

        
      </form>
    </div>
  );
}

export default AddNurse;