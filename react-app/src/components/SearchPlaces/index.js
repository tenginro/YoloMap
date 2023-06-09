import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { actionClearPlaces, thunkGetSearchedPlaces } from "../../store/place";
import NotFound from "../NotFound";
import PlaceIndexItem from "../AllPlaces/PlaceIndexItem";
import "../AllPlaces/AllPlaces.css";
import MapPage from "../AllPlaces/Map";

export default function SearchPlaces() {
  const dispatch = useDispatch();
  const { searchInput } = useParams();
  const location = useLocation();

  const { selectedCategory } = location.state || {};

  const [selectedPlaceFromAllPlaces, setSelectedPlaceFromAllPlaces] =
    useState(null);
  const [selectedCategoryForPlaces, setSelectedCategoryForPlaces] =
    useState(selectedCategory);

  const user = useSelector((state) => state.session.user);
  const userId = user.id;
  const placesObj = useSelector((state) => state.places.allPlaces);
  let placesArr = Object.values(placesObj);

  useEffect(() => {
    dispatch(thunkGetSearchedPlaces(searchInput));
    return () => {
      dispatch(actionClearPlaces());
    };
  }, [dispatch, searchInput]);

  if (selectedCategoryForPlaces && placesArr.length) {
    let filteredPlacesArr = placesArr.filter(
      (el) => el.category === selectedCategoryForPlaces
    );
    placesArr = filteredPlacesArr;
  }

  if (!placesArr.length) {
    return <NotFound />;
  }

  return (
    <div className="allPlacesPage">
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
        <h2>Explore All {selectedCategoryForPlaces} Places</h2>
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
