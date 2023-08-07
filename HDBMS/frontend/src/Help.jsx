import React from 'react';
import './help.css'; // Import the CSS file for styles

function Help() {
  return (
    <div className="help-container">
    <h2 className='text mb-4'>
         <span style={{ color: '#042e5b'}}>Hospital </span>
         <span style={{ color: '#042e5b' ,backgroundColor: 'white'}}>Medi</span>
         <span style={{ color: 'white', backgroundColor: ' #042e5b' }}>Care</span>
         <span style={{ color: '#042e5b'}}> Details</span>
    </h2>
      <div className="detail-container">
        <p>
          Welcome to Hospital Medicare! We are committed to providing top-quality healthcare services to our patients.
        </p>
      </div>
      <div className="detail-container">
        <p className="label">Our Address:</p>
        <p>123 Medical Street, City, Country</p>
      </div>
      <div className="detail-container">
        <p className="label">Contact Number:</p>
        <p>+1 (123) 456-7890</p>
      </div>
      <div className="detail-container">
        <p className="label">Email:</p>
        <p>info@hospitalmedicare.com</p>
      </div>
      <div className="detail-container">
        <p className="label">Visit our website:</p>
        <p className="link">www.hospitalmedicare.com</p>
      </div>
      <div className="detail-container">
        <p className="label">Opening Hours:</p>
        <p>Monday - Friday: 8:00 AM to 8:00 PM</p>
        <p>Saturday: 9:00 AM to 5:00 PM</p>
        <p>Sunday: Closed</p>
      </div>
      <div className="detail-container">
        <p>
          For any inquiries, please contact us via phone or email. We are here to assist you!
        </p>
      </div>
    </div>
  );
}

export default Help;
