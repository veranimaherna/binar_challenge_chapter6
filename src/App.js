import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "swiper/swiper.min.css";

import "./App.scss";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Detail from "./pages/detail/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RedirectIfProtected from "./components/RedirectIfProtected";
import Protected from "./components/Protected";

const App = () => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route
              path="/"
              element={
                <RedirectIfProtected>
                  <Home />
                </RedirectIfProtected>
              }
            />

            <Route
              path="/home"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />

            <Route
              path="/register"
              element={
                <RedirectIfProtected>
                  <Register />
                </RedirectIfProtected>
              }
            />

            <Route
              path="/login"
              element={
                <RedirectIfProtected>
                  <Login />
                </RedirectIfProtected>
              }
            />

            <Route path="/movie/search/:keyword" element={<Catalog />} />
            <Route path="/movie" element={<Catalog />} />
            <Route path="/movie/:id" element={<Detail />} />
          </Routes>

          <Footer />

          <ToastContainer theme="colored" />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  );
};
export default App;
