import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { thunkDeletePlace, thunkGetUserPlaces } from "../../store/place";
import { useModal } from "../../context/Modal";
import "./DeletePlaceModal.css";

export default function DeletePlaceModal({ place }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const onClick = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeletePlace(place))
      .then(closeModal)
      .then(() => dispatch(thunkGetUserPlaces()))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(Object.values(data.errors));
        }
      });

    return history.push("/current");
  };

  return (
    <>
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to remove this place from the listings?</h3>
      <div className="deleteSpotModalButton">
        <button className="yesButton" type="button" onClick={onClick}>
          Yes (Delete place)
        </button>
        <button className="noButton" type="button" onClick={closeModal}>
          No (Keep place){" "}
        </button>
      </div>
    </>
  );
}
