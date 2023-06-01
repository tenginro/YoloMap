import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { actionClearPlaces, thunkGetAllPlaces } from "../../store/place";
import PlaceIndexItem from "./PlaceIndexItem";
import "./AllPlaces.css";
import MapPage from "./Map";

export default function AllPlaces() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { selectedCategory } = location.state || {};

  const user = useSelector((state) => state.session.user);

  const placesObj = useSelector((state) => state.places.allPlaces);
  let placesArr = Object.values(placesObj);

  const [selectedPlaceFromAllPlaces, setSelectedPlaceFromAllPlaces] =
    useState(null);
  const [selectedCategoryForPlaces, setSelectedCategoryForPlaces] =
    useState(selectedCategory);

  useEffect(() => {
    dispatch(thunkGetAllPlaces());
    return () => {
      dispatch(actionClearPlaces());
    };
  }, [dispatch]);

  if (selectedCategoryForPlaces && placesArr.length) {
    let filteredPlacesArr = placesArr.filter(
      (el) => el.category === selectedCategoryForPlaces
    );
    placesArr = filteredPlacesArr;
  }

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
    <div className="allPinsPage">
      <div className="filters">
        <h2>Categories</h2>
        <label>
          <input
            type="checkbox"
            onChange={() =>
              selectedCategoryForPlaces !== "Art"
                ? setSelectedCategoryForPlaces("Art")
                : setSelectedCategoryForPlaces(null)
            }
            checked={selectedCategoryForPlaces === "Art"}
          ></input>{" "}
          Art
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() =>
              selectedCategoryForPlaces !== "Bakery"
                ? setSelectedCategoryForPlaces("Bakery")
                : setSelectedCategoryForPlaces(null)
            }
            checked={selectedCategoryForPlaces === "Bakery"}
          ></input>{" "}
          Bakery
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() =>
              selectedCategoryForPlaces !== "Bar"
                ? setSelectedCategoryForPlaces("Bar")
                : setSelectedCategoryForPlaces(null)
            }
            checked={selectedCategoryForPlaces === "Bar"}
          ></input>{" "}
          Bar
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() =>
              selectedCategoryForPlaces !== "Coffee/Tea"
                ? setSelectedCategoryForPlaces("Coffee/Tea")
                : setSelectedCategoryForPlaces(null)
            }
            checked={selectedCategoryForPlaces === "Coffee/Tea"}
          ></input>{" "}
          Coffee/Tea
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() =>
              selectedCategoryForPlaces !== "Restaurant"
                ? setSelectedCategoryForPlaces("Restaurant")
                : setSelectedCategoryForPlaces(null)
            }
            checked={selectedCategoryForPlaces === "Restaurant"}
          ></input>{" "}
          Restaurant
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() =>
              selectedCategoryForPlaces !== "Travel"
                ? setSelectedCategoryForPlaces("Travel")
                : setSelectedCategoryForPlaces(null)
            }
            checked={selectedCategoryForPlaces === "Travel"}
          ></input>{" "}
          Travel
        </label>
      </div>
      <div className="places">
        <h2>All places</h2>
        {placesArr?.map((place) => (
          <div
            key={place.id}
            onMouseOver={() => setSelectedPlaceFromAllPlaces(place)}
            onMouseOut={() => setSelectedPlaceFromAllPlaces(null)}
          >
            <PlaceIndexItem key={place.id} place={place} />
          </div>
        ))}
      </div>
      {placesArr?.length ? (
        <MapPage
          placesArr={placesArr}
          selectedPlaceFromAllPlaces={selectedPlaceFromAllPlaces}
        />
      ) : (
        <MapPage />
      )}
    </div>
  );
}
