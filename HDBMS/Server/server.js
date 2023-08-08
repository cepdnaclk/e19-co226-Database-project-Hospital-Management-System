import express from "express"
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from "cookie-parser"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const app= express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const con =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"hospitaldatabase"
})

con.connect(function(err){
    if (err){
        console.log("Error in Connection");
    }else{
        console.log("Connected");
    }
})

app.post('/login',(req,res)=>{
    const sql = "SELECT * FROM USER WHERE email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Internal server error.",Error:"Error in running query" });
        if (result.length > 0) {
            const user = result[0]; // Assuming the first row of the result contains the user details
            return res.json({ Status: "success", Role: user.Role });
        }else {
            return res.json({ Status: "Error",Error:"Wrong Email or password" });
        }

    });

})

// Endpoint to add a patient
app.post('/addPatient', (req, res) => {
    const { P_ID, Name, Gender, ContactNumber, Address, Email, W_Number, REP_ID } = req.body;
    const sql = 'INSERT INTO patient (P_ID, Name, Gender, ContactNumber, Address, Email, W_Number, REP_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [P_ID, Name, Gender, ContactNumber, Address, Email, W_Number, REP_ID];
  
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding patient:', err);
        return res.json({ Status: 'Error', Error: 'Failed to add patient to the database.' });
      }
      return res.json({ Status: 'Success', Message: 'Patient added successfully.' });
    });
  });

// API endpoint to fetch patient profile data
app.get('/patient', (req, res) => {
  // Assuming you have access to the logged-in patient's ID from the session or token
  const patientId = 1; // Replace with the actual patient ID

  const sql = 'SELECT * FROM patient WHERE P_ID = ?';
  db.query(sql, [patientId], (err, result) => {
    if (err) {
      console.error('Error fetching patient data:', err);
      return res.status(500).json({ error: 'Failed to fetch patient data from the database' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const patient = result[0];
    return res.json(patient);
  });
});



  app.post('/addDoctor', (req, res) => {
    const { DOC_ID, Name, Gender, Specialization, ContactNumber, Address, Email } = req.body;
    const sql = 'INSERT INTO Doctor (DOC_ID, Name, Gender, Specialization, ContactNumber, Address, Email) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [DOC_ID, Name, Gender, Specialization, ContactNumber,Address, Email];

    con.query(sql, values, (err, result) => {
    if (err) {
        console.error('Error adding Doctor:', err);
        return res.json({ Status: 'Error', Error: 'Failed to add Doctor to the database.' });
    }
    return res.json({ Status: 'Success', Message: 'Doctor added successfully.' });
    });
});

app.post('/addNurse', (req, res) => {
    const { NR_ID, Name, ContactNumber, Address, Email, Gender } = req.body;
    const sql = 'INSERT INTO Nurse (NR_ID, Name, ContactNumber, Address, Email, Gender) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [NR_ID, Name, ContactNumber, Address, Email, Gender];

    con.query(sql, values, (err, result) => {
    if (err) {
        console.error('Error adding Nurse:', err);
        return res.json({ Status: 'Error', Error: 'Failed to add Nurse to the database.' });
    }
    return res.json({ Status: 'Success', Message: 'Nurse added successfully.' });
    });
});

app.post('/addReceptionist', (req, res) => {
    const { REP_ID, Name, Gender, ContactNumber, Address, Email } = req.body;
    const sql = 'INSERT INTO Receptionist (REP_ID, Name, Gender, ContactNumber, Address, Email) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [REP_ID, Name, Gender, ContactNumber, Address, Email];

    con.query(sql, values, (err, result) => {
    if (err) {
        console.error('Error adding Receptionist:', err);
        return res.json({ Status: 'Error', Error: 'Failed to add Receptionist to the database.' });
    }
    return res.json({ Status: 'Success', Message: 'Receptionist added successfully.' });
    });
});


  app.post('/searchPatient', (req, res) => {
    const { searchCriteria } = req.body;
    const sql = 'SELECT * FROM patient WHERE P_ID LIKE ? ';
    const searchValue = `%${searchCriteria}%`;
  
    con.query(sql, [searchValue], (err, result) => {
      if (err) {
        console.error('Error searching for patients:', err);
        return res.json({ Status: 'Error', Error: 'Failed to search for patients in the database.' });
      }
      if (result.length > 0) {
        return res.json({ Status: 'Success', Patients: result });
      } else {
        return res.json({ Status: 'Error', Error: 'No patients found.' });
      }
    });
  });

  app.get('/getPatientCount', (req, res) => {
    const sql = 'SELECT COUNT(*) AS count FROM patient';
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching patient count:', err);
            return res.json({ Status: 'Error', Error: 'Failed to fetch patient count from the database.' });
        }
        return res.json({ Status: 'Success', count: result[0].count });
    });
});

app.get('/getReceptionistCount', (req, res) => {
  const sql = 'SELECT COUNT(*) AS count FROM Receptionist';
  con.query(sql, (err, result) => {
      if (err) {
          console.error('Error fetching receptionist count:', err);
          return res.json({ Status: 'Error', Error: 'Failed to fetch receptionist count from the database.' });
      }
      return res.json({ Status: 'Success', count: result[0].count });
  });
});

app.get('/getDoctorCount', (req, res) => {
  const sql = 'SELECT COUNT(*) AS count FROM Doctor';
  con.query(sql, (err, result) => {
      if (err) {
          console.error('Error fetching doctor count:', err);
          return res.json({ Status: 'Error', Error: 'Failed to fetch doctor count from the database.' });
      }
      return res.json({ Status: 'Success', count: result[0].count });
  });
});

app.get('/getNurseCount', (req, res) => {
  const sql = 'SELECT COUNT(*) AS count FROM Nurse';
  con.query(sql, (err, result) => {
      if (err) {
          console.error('Error fetching nurse count:', err);
          return res.json({ Status: 'Error', Error: 'Failed to fetch nurse count from the database.' });
      }
      return res.json({ Status: 'Success', count: result[0].count });
  });
});



  

app.listen(8081, ()=>{
    console.log("Running");
})