import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import logo from "../Navigation/logo.jpeg";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const demoUserSubmitHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login("demo@aa.io", "password"))
      .then(closeModal)
      .then(() => history.push(`/places`))
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div id="loginModal">
      <h2>Log in to YoloMap</h2>

      <form className="loginForm" onSubmit={handleSubmit}>
        {errors.length ? (
          <ul className="errorContainerLogIn">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        ) : (
          <div className="errorContainerLogIn">
            <img className="logo" src={logo} alt="icon"></img>
          </div>
        )}
        <div>
          <label>
            Email*:
            <input
              className="loginModalInput"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password*:
            <input
              className="loginModalInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>
        </div>
        <div>* - required field</div>
        <button className="loginModalButton" type="submit">
          Log In
        </button>
        <button
          className="demoUserButton"
          onClick={demoUserSubmitHandler}
          type="submit"
        >
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
