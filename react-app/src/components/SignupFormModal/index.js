import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";

import logo from "../Navigation/logo.jpeg";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profile_pic, setProfilePic] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [budget, setBudget] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("budget", budget);
      formData.append("profile_pic", profile_pic);
      setImageLoading(true);

      const data = await dispatch(signUp(formData));

      if (data) {
        setImageLoading(false);
        setErrors(data);
      } else {
        setImageLoading(false);
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div id="signupModal">
      <h1>Sign Up</h1>
      {errors.length ? (
        <ul className="errorContainerSignup">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      ) : (
        <div className="errorContainerSignup">
          <img className="logo" src={logo} alt="icon"></img>
        </div>
      )}
      <form
        className="signupForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label>
          Email*:{"  "}
          <input
            className="signupModalInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </label>
        <label>
          Username*:{"  "}
          <input
            className="signupModalInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </label>
        <label>
          Profile Picture:{"  "}
          <input
            id="signupProfilePicInput"
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </label>
        <label>
          Budget Amount*: ${"  "}
          <input
            className="signupModalInput"
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </label>
        <label>
          Password*:{"  "}
          <input
            className="signupModalInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </label>
        <label>
          Confirm Password*:{"  "}
          <input
            className="signupModalInput"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </label>
        <div>* - required field</div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
