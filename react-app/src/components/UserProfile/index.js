import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { actionClearPlaces, thunkGetUserPlaces } from "../../store/place";
import UserPlaceIndexItem from "./UserPlaceIndexItem";
import "./UserProfile.css";
import { actionClearProducts, thunkGetUserProducts } from "../../store/product";
import OpenModalMenuItem from "../OpenModalMenuItem";
import DeleteProductModal from "../DeleteProductModal";
import UpdateProductModal from "../UpdateProductModal";
import { thunkUpdateBudget } from "../../store/session";
import UpdateBudget from "../UpdateBudgetModal";

const defaultProfilePic =
  "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";

const defaultPic =
  "https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-10615.jpg?w=360";

export default function UserProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
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
        <img
          src={user.profile_pic || defaultProfilePic}
          alt="profile pic"
        ></img>
        <div>Username: {user.username}</div>
        <div>Email: {user.email}</div>
        <div>
          Budget: ${user.budget}
          <button className="updateBudgetButton">
            <OpenModalMenuItem
              itemText="Update"
              modalComponent={<UpdateBudget />}
            />
          </button>
        </div>
      </div>

      <div id="placesAndProducts">
        <div className="places">
          <div>
            <h2>All places you created </h2>
            <NavLink exact to="/places/new">
              <div className="toGreen link">
                Create a new place you want to go
              </div>
            </NavLink>
          </div>
          {placesArr?.map((place) => (
            <UserPlaceIndexItem key={place.id} place={place} />
          ))}
        </div>
        <div className="products">
          <div>
            <h2>All products you created</h2>
            <div className="toChangeSize">
              To create a product, go to the place detail page
            </div>
          </div>
          {productsArr?.map((product) => (
            <div key={product.id} className="productIndexInUserProfile">
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
              <div className="productInformation">
                <img
                  src={product.cover_pic || defaultPic}
                  alt="productCoverPic"
                ></img>
                <div>
                  <h4>
                    <div>{product.name}</div>
                    <div
                      className="placeForProduct"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push(`/places/${product.place.id}`);
                      }}
                    >
                      in {product?.place?.name}
                    </div>
                  </h4>
                  <div>{product.description}</div>
                  <div>${product.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
