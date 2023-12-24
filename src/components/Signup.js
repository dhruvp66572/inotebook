import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Signup(props) {

  const [credential, setCredential] = useState({name:"",email:"",password:"",cpassword:""})
let history =  useNavigate()
    const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credential;
    // API Call
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email, password }),
    });

    const json = await response.json();
    console.log(json)

    if(json.success){
        // Save the auth token and Redirect 
        localStorage.setItem('token',json.authtoken)
        history('/')
        props.showAlert("Account Created Successfully","success")
    }
    else{
        props.showAlert("Invalid Credentials","Danger")
    }
  };

  const handlechange = (e) => {
    setCredential({...credential,[e.target.name]:e.target.value})
  };
  return (  
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            // value={''}
            onChange={handlechange}
          />    
        </div>
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
            // value={''}
            onChange={handlechange}
            required
            
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
            // value={''}
            onChange={handlechange}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Confirm Password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            // value={''}
            onChange={handlechange}
            required
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Signup