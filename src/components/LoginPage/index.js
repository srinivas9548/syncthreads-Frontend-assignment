import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

import "./index.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmitSuccess = (jwtToken) => {
    setShowSubmitError(false);
    Cookies.set("jwtToken", jwtToken, {expires: 1}); // Store or Set the jwtToken in Cookies
    navigate("/"); // Redirect to the Home Route
  }

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  }

  const onSubmitForm = async (event) => {
    event.preventDefault();

    const userDetails = { username, password };
    const url = "https://srinivas-syncthreads-backend-assignment.vercel.app/api/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    // console.log(response);
    // console.log(data);

    if (response.ok) {
      onSubmitSuccess(data.jwtToken);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeShowPassword = () => {
    setShowPassword(prev => !prev);
  }

  return (
    <div className="login-page-container">
      <div className="login-page-responsive">
        <h1 className="login-page-heading">Login Page</h1>
        <form className="form-container" onSubmit={onSubmitForm}>
          <div className="label-input-container">
            <label htmlFor="username" className="label-element">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="input-element"
              placeholder="Username"
              onChange={onChangeUsername}
              value={username}
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="password" className="label-element">
              PASSWORD
            </label>
            <input
              id="password"
              type={showPassword ? "password" : "text"}
              className="input-element"
              placeholder="Password"
              onChange={onChangePassword}
              value={password}
            />
          </div>
          <div className="label-checkbox-container">
            <input
              type="checkbox"
              id="showPassword"
              className="checkbox-input"
              onChange={onChangeShowPassword}
            />
            <label htmlFor="showPassword" className="show-password-label">Show Password</label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;