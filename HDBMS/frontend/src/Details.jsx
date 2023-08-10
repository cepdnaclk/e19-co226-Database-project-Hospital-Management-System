import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Details.css';

function Details() {
  const [patientCount, setPatientCount] = useState(0);
  const [receptionistCount, setReceptionistCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [nurseCount, setNurseCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8081/getPatientCount')
      .then((response) => {
        setPatientCount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching patient count:', error);
      });

    axios.get('http://localhost:8081/getReceptionistCount')
      .then((response) => {
        setReceptionistCount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching receptionist count:', error);
      });

    axios.get('http://localhost:8081/getDoctorCount')
      .then((response) => {
        setDoctorCount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching doctor count:', error);
      });

    axios.get('http://localhost:8081/getNurseCount')
      .then((response) => {
        setNurseCount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching nurse count:', error);
      });
  }, []);

  return (
    <div className='container'>
      <h2><b>Details</b></h2>
      <div className='info-card'>
        <p>Total Patients</p>
        <span>{patientCount}</span>
      </div>
      <div className='info-card'>
        <p>Total Receptionists</p>
        <span>{receptionistCount}</span>
      </div>
      <div className='info-card'>
        <p>Total Doctors</p>
        <span>{doctorCount}</span>
      </div>
      <div className='info-card'>
        <p>Total Nurses</p>
        <span>{nurseCount}</span>
      </div>
    </div>
  );
}

export default Details;