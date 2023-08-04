import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [values,setValues]=useState({
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
                if (res.data.Role === 'admin')
                    navigate('/adminDashboard')
            }else{
                setError(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    }
    return (
      <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        
        <div className='p-3 rounded w-25 border loginForm'>
            <div className='text-danger'>
                {error && <b>{error}</b>}
            </div>

            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label><br></br>
                    <input type='email' placeholder='Enter Email' name='email' 
                    onChange={e=> setValues({...values,email:e.target.value})} className='from-control rounded-0 w-100'  />
                </div>

                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label><br></br>
                    <input type='password' placeholder='Enter Password' name='password' 
                    onChange={e=> setValues({...values, password:e.target.value})}  className='from-control rounded-0 w-100'/>
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                <p>You are agree to our terms and policies</p>
                
            </form>

        </div>

      </div>
    )
}

export default Login;
