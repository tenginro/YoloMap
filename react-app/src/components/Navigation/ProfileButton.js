import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, thunkUpdateBudget } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import {
  actionClearCart,
  thunkClearCart,
  thunkDelateCart,
  thunkGetUserCart,
} from "../../store/cart";
import BetterPlanAlert from "./BetterPlanAlert";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItemsObj = useSelector((state) => state.cart);
  const cartItemArr = Object.values(cartItemsObj);

  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  // create a reference to a DOM element or a component.
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const openCart = () => {
    if (showCart) return;
    dispatch(thunkGetUserCart());
    setShowCart(true);
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

  useEffect(() => {
    if (!showCart) return;
    const closeCart = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowCart(false);
      }
    };
    document.addEventListener("click", closeCart);
    return () => document.removeEventListener("click", closeCart);
  }, [showCart]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  const totalPrice = cartItemArr?.reduce(
    (sumPrice, el) => (sumPrice = sumPrice + el.product.price),
    0
  );
  const isDisabled = totalPrice >= user.budget;

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const cartClassName = "cart-sidebar" + (showCart ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);
  const closeCart = () => setShowCart(false);

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
            <div>Budget: ${user.budget}</div>
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
          <div className="cartIcon" onClick={openCart}>
            <i className="fa-solid fa-cart-shopping fa-2x"></i>
          </div>
          <div className={cartClassName} ref={ulRef}>
            <h3>
              <div>Products in your cart</div>
              <div>{`Budget: $${Math.round(user.budget)}`}</div>
            </h3>
            {cartItemArr?.map((el) => (
              <div key={el.id} className="productInCart">
                <img src={el.product.cover_pic} alt="productCoverPic"></img>
                <div className="productNameInCart">{el.product.name}</div>
                <div className="productPriceInCart">${el.product.price}</div>
                <button
                  className="CartButton"
                  onClick={async (e) => {
                    e.preventDefault();
                    await dispatch(thunkDelateCart(el.id)).then(() =>
                      thunkGetUserCart()
                    );
                  }}
                >
                  Remove from Cart
                </button>
              </div>
            ))}
            <div id="purchaseButtonContainer">
              <div>Total price: ${totalPrice}</div>
              <button
                className={
                  isDisabled ? "purchaseButton-disabled" : "purchaseButton"
                }
                disabled={isDisabled}
                onClick={async (e) => {
                  e.preventDefault();
                  if (totalPrice < user.budget) {
                    const newBudget = user.budget - totalPrice;
                    const formData = new FormData();
                    formData.append("budget", Math.round(newBudget));

                    await dispatch(thunkUpdateBudget(formData))
                      .then(() => dispatch(thunkClearCart()))
                      .then(() => dispatch(thunkGetUserCart()));
                  }
                }}
              >
                Purchase
              </button>
            </div>
            <div id="overBudgetAlert">
              {totalPrice >= user.budget
                ? "Over Budget!!! Please make a better plan!"
                : null}
            </div>
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
