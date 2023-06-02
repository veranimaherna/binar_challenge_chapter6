import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link,  useNavigate } from "react-router-dom";
import { register } from "../redux/actions/auth";
import { toast } from "react-toastify";
import GoogleLogin from "../components/GoogleLogin";
import FormLogin from "../components/login/FormLogin";
import "./register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const data = { email, password, name };

    if (password !== confirmPassword) {
      toast.error("Confirm password must be same with password");
      return;
    }

    dispatch(register(data, navigate));
  };

  return (
    <div className="register">
      <form onSubmit={onSubmit}>
        <h1>Register</h1>
        <FormLogin
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormLogin
          controlId="formBasicEmail"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormLogin
          controlId="formBasicPassword"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormLogin
          controlId="formBasicPassword"
          type="password"
          placeholder="Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="loginButton" type="submit">
          Register
        </button>
        <div className="haveAccount">
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
        <p>OR</p>
        <GoogleLogin buttonText={"Register with Google"} />
      </form>
    </div>
  );
};

export default Register;
