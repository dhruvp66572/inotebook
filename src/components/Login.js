import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const host = process.env.REACT_APP_API_URL;
  const [credential, setCredential] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  let history = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API Call
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credential.email,
          password: credential.password,
        }),
      });

      const json = await response.json();

      if (json.success) {
        // Save the auth token and Redirect
        localStorage.setItem("token", json.authtoken);
        history("/");
        props.showAlert("Logged in Successfully", "success");
      } else {
        props.showAlert("Invalid Details", "danger");
      }
    } catch (error) {
      props.showAlert("Something went wrong", "danger");
    } finally {
      setLoading(false);
    }
  };

  const handlechange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-5">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    placeholder="Enter your email"
                    aria-describedby="emailHelp"
                    name="email"
                    value={credential.email}
                    onChange={handlechange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    placeholder="Enter your password"
                    name="password"
                    value={credential.password}
                    onChange={handlechange}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100"
                  disabled={loading}
                >
                  {loading ? 
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> :
                    null
                  }
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <div className="text-center mt-3">
                  <a href="#!" className="text-decoration-none">Forgot password?</a>
                </div>
              </form>
            </div>
          </div>
          <div className="text-center mt-3">
            <p>Don't have an account? <a href="/signup" className="text-decoration-none">Sign up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
