import React, { useEffect, useState } from 'react';
import axios from 'axios';


function PProfile() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch patient profile data from the backend API
    axios
      .get('/patient') // Assumes your frontend is running on the same domain as the backend
      .then((response) => {
        setPatient(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching patient data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Patient Profile Details</h1>
      {patient ? (
        <>
          <div>
            <strong>Patient ID:</strong> {patient.P_ID}
          </div>
          <div>
            <strong>Name:</strong> {patient.Name}
          </div>
          <div>
            <strong>Gender:</strong> {patient.Gender}
          </div>
          <div>
            <strong>Contact Number:</strong> {patient.ContactNumber}
          </div>
          <div>
            <strong>Address:</strong> {patient.Address}
          </div>
          <div>
            <strong>Email:</strong> {patient.Email}
          </div>
          <div>
            <strong>Word Number:</strong> {patient.W_Number}
          </div>
          <div>
            <strong>REP ID:</strong> {patient.REP_ID}
          </div>
          {/* Add other patient profile details as needed */}
        </>
      ) : (
        <div>Patient data not found</div>
      )}
    </div>
  );
}

export default PProfile;
