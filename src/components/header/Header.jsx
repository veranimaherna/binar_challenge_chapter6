import React, { useRef, useEffect, useState, useCallback } from "react";

import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";

import "./header.scss";
import Input from "../input/Input";
import Button, { OutlineButton } from "../button/Button";

import { UilSearch } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../../redux/actions/auth";

const MovieSearch = (props) => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/movie/search/${keyword}`);
    }
  }, [keyword, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Search Movie..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        <UilSearch className="icon-search" />
      </Button>
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(getProfile(navigate));
    }
  }, [dispatch, isLoggedIn, navigate, token]);

  const headerRef = useRef(null);

  const { keyword } = useParams();

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <Link to="/" className="logo__name">
            MovieList
          </Link>
        </div>
        <div className="search">
          <MovieSearch keyword={keyword} />
        </div>
        {isLoggedIn ? (
          <>
            <ul className="header__genres">
              <Link to="/movie" className="popular">
                Recommendation For {user?.name}
              </Link>
              <Link
                onClick={() => dispatch(logout(navigate))}
                className="signOut"
              >
                Sign Out
              </Link>
            </ul>
          </>
        ) : (
          <>
            <ul className="header__nav">
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <OutlineButton>Register</OutlineButton>
              </Link>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
