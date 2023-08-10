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
    const { P_ID, Name, Gender, ContactNumber, Address, Email, R_Number, REP_ID } = req.body;

    const sql = 'INSERT INTO patient (P_ID, Name, Gender, ContactNumber, Address, Email, R_Number, REP_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [P_ID, Name, Gender, ContactNumber, Address, Email, R_Number, REP_ID];
  
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding patient:', err);
        return res.json({ Status: 'Error', Error: 'Failed to add patient to the database.' });
      }
      return res.json({ Status: 'Success', Message: 'Patient added successfully.' });
    });
  });




app.post('/addDoctor', (req, res) => {
  const { DOC_ID, Name, Gender, Specialization, ContactNumber, Address, Email } = req.body;
  const specialization = Specialization; // Save Specialization for the second insert

  const sqlDoctor = 'INSERT INTO doctor(DOC_ID, Name, Gender, Specialization, ContactNumber, Address, Email) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const valuesDoctor = [DOC_ID, Name, Gender, Specialization, ContactNumber, Address, Email];

  const sqlSpecialization = 'INSERT INTO specialization (DOC_ID, Specialization) VALUES (?, ?)';
  const valuesSpecialization = [DOC_ID, Specialization];

  con.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.json({ Status: 'Error', Error: 'Failed to add Doctor to the database.' });
    }

    con.query(sqlDoctor, valuesDoctor, (err, result) => {
      if (err) {
        console.error('Error adding Doctor:', err);
        con.rollback(() => {
          return res.json({ Status: 'Error', Error: 'Failed to add Doctor to the database.' });
        });
      }

      con.query(sqlSpecialization, valuesSpecialization, (err, result) => {
        if (err) {
          console.error('Error adding Specialization:', err);
          con.rollback(() => {
            return res.json({ Status: 'Error', Error: 'Failed to add Doctor to the database.' });
          });
        }

        con.commit((err) => {
          if (err) {
            console.error('Error committing transaction:', err);
            con.rollback(() => {
              return res.json({ Status: 'Error', Error: 'Failed to add Doctor to the database.' });
            });
          }

          return res.json({ Status: 'Success', Message: 'Doctor and Specialization added successfully.' });
        });
      });
    });
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

app.post('/diagnose', (req, res) => {
  const {P_ID,DOC_ID,Disease_Details} = req.body;

  const sqlDiagnose = 'INSERT INTO diagnose (DOC_ID, P_ID, Disease_Details) VALUES (?, ?, ?)';
  const valuesDiagnose = [DOC_ID, P_ID, Disease_Details];

  con.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.json({ Status: 'Error', Error: 'Failed to start the transaction.' });
  }
    con.query(sqlDiagnose, valuesDiagnose, (err, result) => {
      if (err) {
        console.error('Error adding diagnose details:', err);
        con.rollback(() => {
          return res.json({ Status: 'Error', Error: 'Failed to add diagnose details to the database.' });
        });
      }

    con.commit((err) => {
      if (err) {
        console.error('Error committing transaction:', err);
        con.rollback(() => {
          return res.json({ Status: 'Error', Error: 'Failed to commit the transaction.' });
          });
      }
          return res.json({ Status: 'Success', Message: 'Diagnose details added successfully.' });
        });
      });
    });
  });

  app.post('/treat', (req, res) => {
    const {P_ID,NR_ID,Given_Medicine} = req.body;
  
    const sqltreat = 'INSERT INTO treat (P_ID,NR_ID,Given_Medicine) VALUES (?, ?, ?)';
    const valuestreat = [P_ID,NR_ID,Given_Medicine];
  
    con.beginTransaction((err) => {
      if (err) {
        console.error('Error starting transaction:', err);
        return res.json({ Status: 'Error', Error: 'Failed to start the transaction.' });
    }
      con.query(sqltreat, valuestreat, (err, result) => {
        if (err) {
          console.error('Error adding treat details:', err);
          con.rollback(() => {
            return res.json({ Status: 'Error', Error: 'Failed to add treat details to the database.' });
          });
        }
  
      con.commit((err) => {
        if (err) {
          console.error('Error committing transaction:', err);
          con.rollback(() => {
            return res.json({ Status: 'Error', Error: 'Failed to commit the transaction.' });
            });
        }
            return res.json({ Status: 'Success', Message: 'Treat details added successfully.' });
          });
        });
      });
    });

    app.post('/room', (req, res) => {
      const {R_Number,P_ID,exit_date} = req.body;
    
      const sqlroom = 'INSERT INTO room (R_Number,P_ID,exit_date) VALUES (?, ?, ?)';
      const valuesroom = [R_Number,P_ID,exit_date];
    
      con.beginTransaction((err) => {
        if (err) {
          console.error('Error starting transaction:', err);
          return res.json({ Status: 'Error', Error: 'Failed to start the transaction.' });
      }
        con.query(sqlroom, valuesroom, (err, result) => {
          if (err) {
            console.error('Error adding ward details:', err);
            con.rollback(() => {
              return res.json({ Status: 'Error', Error: 'Failed to add room details to the database.' });
            });
          }
    
        con.commit((err) => {
          if (err) {
            console.error('Error committing transaction:', err);
            con.rollback(() => {
              return res.json({ Status: 'Error', Error: 'Failed to commit the transaction.' });
              });
          }
              return res.json({ Status: 'Success', Message: 'Room details added successfully.' });
            });
          });
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



  

app.listen(8081, ()=>{
    console.log("Running");
})