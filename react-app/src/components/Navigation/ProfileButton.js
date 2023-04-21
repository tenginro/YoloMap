import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {user ? (
        <>
          <a
            href="https://github.com/tenginro"
            // open a new window
            target="_blank"
            // rel attribute sets the relationship between your page and the linked URL. Setting it to noopener noreferrer is to prevent a type of phishing known as tabnabbing (which persuades users to submit their login details and passwords to popular websites by impersonating those sites and convincing the user that the site is genuine.).
            rel="noreferrer noopener"
          >
            <i className="fa-brands fa-github fa-2x"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/luotengzhong/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fa-brands fa-linkedin fa-2x"></i>
          </a>
          <div className="profileIcon" onClick={openMenu}>
            <i className="fas fa-user-circle fa-2x" title={user.username} />
          </div>
          <div className={ulClassName} ref={ulRef}>
            <div>{`Budget: $${Math.round(user.budget / 1000)},000`}</div>
            <div
              className="viewProfileLine"
              onClick={(e) => history.push("/current")}
            >
              View my profile
            </div>
            <div className="logoutLine" onClick={handleLogout}>
              <i className="fas fa-solid fa-right-from-bracket"></i>
              Log Out
            </div>
          </div>
          <div>
            <i className="fa-solid fa-cart-shopping fa-2x"></i>
          </div>
        </>
      ) : (
        <div className="loginSignUpButtons">
          <a
            href="https://github.com/tenginro"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fa-brands fa-github fa-2x"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/luotengzhong/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fa-brands fa-linkedin fa-2x"></i>
          </a>
          <OpenModalButton
            buttonText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />
          <OpenModalButton
            buttonText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
        </div>
      )}
    </>
  );
}

export default ProfileButton;
