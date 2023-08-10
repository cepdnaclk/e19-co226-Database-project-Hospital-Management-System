import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {

  const [values,setValues]=useState
({
    email:'',
    password:''
})

const navigate = useNavigate()

const [error,setError] =useState('')

 const handleSubmit = (event)=>{
     event.preventDefault();
     axios.post('http://localhost:8081/login',values)
     .then(res => {
         if (res.data.Status==='success'){
             if (res.data.Role==='Receptionist')
                 navigate('/')
             else if (res.data.Role === 'admin')
                 navigate('/DashboardAdmin')
             else if (res.data.Role === 'nurse' || res.data.Role === 'doctor')
                 navigate('/DashboardTreat');            
         }else{
             setError(res.data.Error);
         }
     })
     .catch(err => console.log(err));
 }

  
 return (
  <div className='logingpage'>
    <div className='logingform'>
      <div className='text-center text-danger mb-3'>{error && <b>{error}</b>}</div>

      <h1 className='text-center mb-4'>
        <span style={{ color: '#042e5b' }}>Medi</span>
        <span style={{ color: 'rgba(239, 242, 246, 0.8)', backgroundColor: '#042e5b' }}>Care</span>
      </h1>

      <h2 className='text-center mb-4'>Login</h2>

      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email'><strong>Email</strong></label>
          <input
            type='email'
            placeholder='Enter Email'
            name='email'
            onChange={e => setValues({ ...values, email: e.target.value })}
            className='form-control rounded-pill'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password'><strong>Password</strong></label>
          <input
            type='password'
            placeholder='Enter Password'
            name='password'
            onChange={e => setValues({ ...values, password: e.target.value })}
            className='form-control rounded-pill'
          />
        </div>

        <button
          type='submit'
          className='btn btn-success btn-block rounded-pill'
          style={{ backgroundColor: 'lightblue', color: '#042e5b' }}
        >
          <strong>Log in</strong>
        </button>

        <p className='text-center mt-3' style={{ color: '#042e5b' }}>
          <strong>You agree to our terms and policies</strong>
        </p>

      </form>
    </div>
  </div>
);
};


export default Login;
