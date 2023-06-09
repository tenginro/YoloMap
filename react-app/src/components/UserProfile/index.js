import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { actionClearPlaces, thunkGetUserPlaces } from "../../store/place";
import UserPlaceIndexItem from "./UserPlaceIndexItem";
import "./UserProfile.css";
import { actionClearProducts, thunkGetUserProducts } from "../../store/product";
import OpenModalMenuItem from "../OpenModalMenuItem";

import UpdateBudget from "../UpdateBudgetModal";
import UserProductIndexItem from "./UserProductIndexItem";
import { actionClearReviews, thunkGetUserReviews } from "../../store/review";
import UserReviewIndexItem from "./UserReviewIndexItem";

const defaultProfilePic =
  "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";

export default function UserProfile() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const placesObj = useSelector((state) => state.places.allPlaces);
  const placesArr = Object.values(placesObj);
  const productsObj = useSelector((state) => state.products.allProducts);
  const productsArr = Object.values(productsObj);
  const reviewsObj = useSelector((state) => state.reviews.allReviews);
  const reviewsArr = Object.values(reviewsObj);

  const [selectedPage, setSelectedPage] = useState("places");

  useEffect(() => {
    dispatch(thunkGetUserPlaces());
    dispatch(thunkGetUserProducts());
    dispatch(thunkGetUserReviews());
    return () => {
      dispatch(actionClearPlaces());
      dispatch(actionClearProducts());
      dispatch(actionClearReviews());
    };
  }, [dispatch]);

  if (!placesObj) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <img
          src="https://assets-global.website-files.com/5c7fdbdd4e3feeee8dd96dd2/6134707265a929f4cdfc1f6d_5.gif"
          alt="Loading"
        ></img>
      </div>
    );
  }

  return (
    <div className="userProfilePage">
      <div className="userProfilePic">
        <div className="userProfileFirstPart">
          <img
            src={user.profile_pic || defaultProfilePic}
            alt="profile pic"
          ></img>
          <div className="userProfileInfo">
            <h1>Username: {user.username}</h1>
            <h3>Email: {user.email}</h3>
            <h3>
              <i className="fa-solid fa-location-dot"></i>
              {placesArr?.length
                ? ` ${placesArr.length}  Places`
                : " 0 Place"}{" "}
              <i className="fa-solid fa-tags"></i>
              {productsArr?.length
                ? ` ${productsArr.length}  Products`
                : " 0 Product"}{" "}
              <i className="fa-solid fa-sack-dollar"></i> Budget: ${user.budget}
              <button style={{ padding: "5px" }} className="updateBudgetButton">
                <OpenModalMenuItem
                  itemText="Update Budget"
                  modalComponent={<UpdateBudget />}
                />
              </button>
            </h3>
          </div>
        </div>
      </div>
      <div id="userProfileSecondPart">
        <div id="userProfileMenu">
          <h2>{user.username}'s Profile</h2>
          <div className="menuOption" onClick={() => setSelectedPage("places")}>
            {" "}
            <i className="fa-solid fa-location-dot"></i> <div> Places</div>
          </div>
          <div
            className="menuOption"
            onClick={() => setSelectedPage("products")}
          >
            <i className="fa-solid fa-tags"></i>
            <div>Products</div>
          </div>
          <div
            className="menuOption"
            onClick={() => setSelectedPage("reviews")}
          >
            <i className="fa-solid fa-registered"></i> <div>Reviews</div>
          </div>
          {/* <div
            className="menuOption"
            style={{ borderBottom: "1px solid #e6e6e6" }}
            onClick={() => alert("Feature coming soon")}
          >
            <i className="fa-solid fa-clock-rotate-left"></i>
            <div>Order History</div>
          </div> */}
        </div>
        <div id="placesAndProducts">
          <div
            className={selectedPage === "places" ? "places" : "places hidden"}
          >
            <div>
              <h2 style={{ color: "#01b636" }}>All places you created </h2>
              <NavLink exact to="/places/new">
                <div className="toGreen link">
                  Create a new place you want to go
                </div>
              </NavLink>
            </div>
            {placesArr?.map((place) => (
              <UserPlaceIndexItem key={place.id} place={place} />
            ))}
            {!placesArr?.length && (
              <div>
                It's your turn — create a place from your favorite restaurant to
                your favorite travel place. Contribute to the YoloMap community
                and help other users find all the great places that you love.
              </div>
            )}
          </div>
          <div
            className={
              selectedPage === "products" ? "products" : "products hidden"
            }
          >
            <div>
              <h2 style={{ color: "#01b636" }}>All products you created</h2>
              <div className="toChangeSize">
                To create a product, go to the place detail page
              </div>
            </div>
            {productsArr?.map((product) => (
              <div key={product.id}>
                <UserProductIndexItem product={product} />
              </div>
            ))}
            {!productsArr?.length && (
              <div>
                Did you know you can create a product in the place detail page
                to help other users discover the businesses and show off your
                own great taste? Welcome to YoloMap!
              </div>
            )}
          </div>
          <div
            className={
              selectedPage === "reviews" ? "reviews" : "reviews hidden"
            }
            style={{ width: "90%", height: "100%", overflowY: "auto" }}
          >
            <div>
              <h2 style={{ color: "#01b636" }}>All reviews you posted</h2>
              <div className="toChangeSize" style={{ marginBottom: "10px" }}>
                To create a review, go to the place detail page
              </div>
            </div>
            {reviewsArr?.map((review) => (
              <div key={review.id}>
                <UserReviewIndexItem review={review} />
              </div>
            ))}
            {!reviewsArr?.length && (
              <div>
                Did you know you can post a review for a product in the place
                detail page to help other users discover the businesses and show
                off your own great taste? Welcome to YoloMap!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
