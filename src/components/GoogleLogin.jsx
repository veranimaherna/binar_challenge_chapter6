import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../redux/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import googleIcon from "../assets/googleIcon.png";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const data = {
        access_token: tokenResponse.access_token,
      };

      dispatch(googleLogin(data, navigate));
    },
  });

  return (
    <button className="loginButton" id="googleLogin" onClick={() => login()}>
      <img src={googleIcon} alt="google icon" />
      Login with Google
    </button>
  );
};

export default GoogleLogin;
