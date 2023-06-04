import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredatials] = useState({ email: "", password: "" });
  let history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    if (json.success) {
      //save the token and redirect
      localStorage.setItem("token", json.token);
      props.showAlert("Login successfully", "success");
      history("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  const onChange = (e) => {
    setCredatials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form className="container" onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
            placeholder="Enter email"
          />
          <div id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
