import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "./logo.jpeg";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="navLine">
      <li>
        {sessionUser ? (
          <NavLink exact to="/">
            <div className="logoLine">
              <img className="logo" src={logo} alt="icon"></img>
              <h1 className="projectName">YoloMap</h1>
            </div>
          </NavLink>
        ) : (
          <NavLink exact to="/places">
            <div className="logoLine">
              <img className="logo" src={logo} alt="icon"></img>
              <h1 className="projectName">YoloMap</h1>
            </div>
          </NavLink>
        )}
      </li>
      {sessionUser && (
        <input
          className="searchInput"
          onClick={() => alert("Feature Coming Soon...")}
          placeholder="Search - feature coming soon"
        ></input>
      )}
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
