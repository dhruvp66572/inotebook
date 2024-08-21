import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

const Login = (props) => {

const [credential, setCredential] = useState({email:"",password:""})
let history =  useNavigate()
    const handleSubmit = async (e) => {
    e.preventDefault();
    // API Call
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credential.email, password:credential.password }),
    });

    const json = await response.json();
   
    if(json.success){
        // Save the auth token and Redirect 
        localStorage.setItem('token',json.authtoken)
        history('/')
        props.showAlert("Logged in Successfully","success")
    }
    else{
      props.showAlert("Invalid Details","Danger")
    }
  };

  const handlechange = (e) => {
    setCredential({...credential,[e.target.name]:e.target.value})
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credential.email}
            onChange={handlechange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credential.password}
            onChange={handlechange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
