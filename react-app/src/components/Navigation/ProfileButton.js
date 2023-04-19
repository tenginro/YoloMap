import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {user ? (
        <>
          <div className="profileIcon" onClick={openMenu}>
            <i className="fas fa-user-circle fa-2x" />
          </div>
          <ul className={ulClassName} ref={ulRef}>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>{`$${user.budget / 1000},000`}</li>
            <li className="logoutLine" onClick={handleLogout}>
              <i className="fas fa-solid fa-right-from-bracket"></i>
              Log Out
            </li>
          </ul>
        </>
      ) : (
        <div className="loginSignUpButtons">
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
