import React, { useState } from "react";
import FormLogin from "../components/login/FormLogin";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "../redux/actions/auth";
import GoogleLogin from "../components/GoogleLogin";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn || user) {
      navigate("/");
    }
  }, [isLoggedIn, navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    dispatch(login(data, navigate));
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
        <button className="loginButton" type="submit">
          Login
        </button>
        <div className="haveAccount">
          <span>Don't have an account? </span>
          <Link to="/register">Register</Link>
        </div>
        <p>OR</p>
        <GoogleLogin buttonText={"Login with Google"} />
      </form>
    </div>
  );
};

export default Login;
