import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "./logo.jpeg";

function Navigation({ isLoaded, searchQuery, setSearchQuery }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  useEffect(() => {
    setSearchQuery("");
  }, [dispatch]);

  useEffect(() => {
    setSearchQuery("");
  }, []);

  return (
    <ul className="navLine">
      <li>
        {sessionUser ? (
          <NavLink exact to="/places">
            <div className="logoLine" onClick={() => setSearchQuery("")}>
              <img className="logo" src={logo} alt="icon"></img>
              <h1 className="projectName">YoloMap</h1>
            </div>
          </NavLink>
        ) : (
          <NavLink exact to="/">
            <div className="logoLine">
              <img className="logo" src={logo} alt="icon"></img>
              <h1 className="projectName">YoloMap</h1>
            </div>
          </NavLink>
        )}
      </li>
      {sessionUser && (
        <input
          type="search"
          className="searchInput"
          placeholder="Search"
          spellCheck={true}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setSearchQuery(e.target.value);
              if (searchQuery.length) {
                history.push(`/places/search/${searchQuery}`);
              }
            }
          }}
        ></input>
      )}
      {isLoaded && (
        <li className="navButtons">
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
