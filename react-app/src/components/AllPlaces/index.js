import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllPlaces } from "../../store/place";
import PlaceIndexItem from "./PlaceIndexItem";
import "./AllPlaces.css";

export default function AllPlaces() {
  const dispatch = useDispatch();
  const placesObj = useSelector((state) => state.places.allPlaces);
  const placesArr = Object.values(placesObj);

  useEffect(() => {
    dispatch(thunkGetAllPlaces());
  }, [dispatch]);

  if (!placesObj)
    return (
      <div>
        <i className="fas fa-solid fa-spinner"></i>
      </div>
    );

  return (
    <div className="allPinsPage">
      <div className="filters" onClick={(e) => alert("Feature coming soon")}>
        <h2>Categories</h2>
        <label>
          <input type="checkbox"></input> Art
        </label>
        <label>
          <input type="checkbox"></input> Bakery
        </label>
        <label>
          <input type="checkbox"></input> Bar
        </label>
        <label>
          <input type="checkbox"></input> Restaurant
        </label>
        <label>
          <input type="checkbox"></input> Travel
        </label>
      </div>
      <div className="places">
        <h2>All places</h2>
        {placesArr?.map((place) => (
          <PlaceIndexItem key={place.id} place={place} />
        ))}
      </div>
      <div className="map" onClick={(e) => alert("Feature coming soon")}>
        <h2>Map</h2>
      </div>
    </div>
  );
}
