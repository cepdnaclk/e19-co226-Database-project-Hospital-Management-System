import React, { useState } from 'react';
import axios from 'axios';
import './search.css';

function SearchPatient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    axios
    .post(`http://localhost:8081/searchPatient`, { searchCriteria: searchQuery })
      .then((response) => {
        if (response.data.Status === 'Success') {
          setPatients(response.data.Patients);
          setError('');
        } else {
          setPatients([]);
          setError(response.data.Error);
        }
      })
      .catch((error) => {
        setPatients([]);
        setError('Failed to search patients. Please try again.');
      });
  };

  return (
    <div className="search-patient-container">
      <h4>Search Patient</h4>
      <div className="search-form">
        <input
          type="text"
          placeholder="Enter patient ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        </div>
      {error && <div className="error-message">{error}</div>}
      {patients.length > 0 && (
        <div className="search-results">
          {patients.map((patient) => (
            <div key={patient.P_ID}>
            <p>Patient ID: {patient.P_ID}</p>
            <p>Name: {patient.Name}</p>
            <p>Gender: {patient.Gender}</p>
            <p>ContactNumber: {patient.ContactNumber}</p>
            <p>Adress: {patient.Address}</p>
            <p>Email: {patient.Email}</p>
            <p>Room Number: {patient.R_Number}</p>
            <p>Resp Number: {patient.REP_ID}</p>
            {/* Add other patient details here */}
            <hr />
          </div>
        ))}
      </div>
            )}

    </div>
  );

}

export default SearchPatient;
