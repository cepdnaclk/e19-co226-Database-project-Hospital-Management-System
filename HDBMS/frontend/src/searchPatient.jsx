import React, { useState } from 'react';
import axios from 'axios';

function SearchPatient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    axios
      .get(`http://localhost:8081/searchPatient?query=${searchQuery}`)
      .then((response) => {
        if (response.data.Status === 'success') {
          setPatients(response.data.patients);
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
          placeholder="Enter patient name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="search-results">
        {patients.map((patient) => (
          <div key={patient.P_ID}>
            <p>Patient ID: {patient.P_ID}</p>
            <p>Name: {patient.Name}</p>
            {/* Add other patient details here */}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPatient;
