import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { actionClearPlaces, thunkGetUserPlaces } from "../../store/place";
import UserPlaceIndexItem from "./UserPlaceIndexItem";
import "./UserProfile.css";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const placesObj = useSelector((state) => state.places.allPlaces);
  const placesArr = Object.values(placesObj);

  useEffect(() => {
    dispatch(thunkGetUserPlaces());
    return () => dispatch(actionClearPlaces());
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
      <NavLink exact to="places/new">
        Create a new place you want to go
      </NavLink>
      <NavLink exact to="products/new">
        Create a new product you want to get
      </NavLink>
      <div className="places">
        <h2>All places you created</h2>
        {placesArr?.map((place) => (
          <UserPlaceIndexItem key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
}
