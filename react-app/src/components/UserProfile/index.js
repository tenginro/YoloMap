import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { actionClearPlaces, thunkGetUserPlaces } from "../../store/place";
import UserPlaceIndexItem from "./UserPlaceIndexItem";
import "./UserProfile.css";
import { actionClearProducts, thunkGetUserProducts } from "../../store/product";
import OpenModalMenuItem from "../OpenModalMenuItem";
import DeleteProductModal from "../DeleteProductModal";
import UpdateProductModal from "../UpdateProductModal";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const placesObj = useSelector((state) => state.places.allPlaces);
  const placesArr = Object.values(placesObj);
  const productsObj = useSelector((state) => state.products.allProducts);
  const productsArr = Object.values(productsObj);

  useEffect(() => {
    dispatch(thunkGetUserPlaces());
    dispatch(thunkGetUserProducts());
    return () => {
      dispatch(actionClearPlaces());
      dispatch(actionClearProducts());
    };
  }, [dispatch]);

  if (!placesObj)
    return (
      <div>
        <i className="fas fa-solid fa-spinner"></i>
      </div>
    );

  return (
    <div className="userProfilePage">
      <div className="userProfilePic">
        <img src={user.profile_pic} alt="profile pic"></img>
        <div>Username: {user.username}</div>
        <div>Email: {user.email}</div>
        <div>Budget: {Math.round(user.budget / 1000)},000</div>
      </div>
      <NavLink exact to="/places/new">
        Create a new place you want to go
      </NavLink>
      <NavLink exact to="/products/new">
        Create a new product you want to get
      </NavLink>
      <div id="placesAndProducts">
        <div className="places">
          <h2>All places you created</h2>
          {placesArr?.map((place) => (
            <UserPlaceIndexItem key={place.id} place={place} />
          ))}
        </div>
        <div className="products">
          <h2>All products you created</h2>
          {productsArr?.map((product) => (
            <div key={product.id} className="productIndexInUserProfile">
              <img src={product.cover_pic} alt="productCoverPic"></img>
              <div>
                <h4>
                  {product.name} in {product?.place.name}
                </h4>
                <div>{product.description}</div>
                <div>${product.price}</div>
                <div className="userProductButtons">
                  <button className="updateButtonItem">
                    <OpenModalMenuItem
                      itemText="Update"
                      modalComponent={
                        <UpdateProductModal
                          product={product}
                          placeId={product.placeId}
                        />
                      }
                    />
                  </button>
                  <button className="deleteButtonItem">
                    <OpenModalMenuItem
                      itemText="Delete"
                      modalComponent={<DeleteProductModal product={product} />}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
