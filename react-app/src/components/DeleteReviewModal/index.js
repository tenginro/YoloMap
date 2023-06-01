import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useModal } from "../../context/Modal";
import { thunkDelateReview, thunkGetUserReviews } from "../../store/review";
import "./DeleteReviewModal.css";

export default function DeleteReviewModal({ review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const onClick = async (e) => {
    e.preventDefault();
    await dispatch(thunkDelateReview(review))
      .then(closeModal)
      .then(() => dispatch(thunkGetUserReviews()))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(Object.values(data.errors));
        }
      });
    return history.push("/current");
  };

  return (
    <div className="deleteReviewModal">
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to remove this review from the listings?</h3>
      <div className="deleteReviewModalButton">
        <button className="yesButton" type="button" onClick={onClick}>
          Yes (Delete review)
        </button>
        <button className="noButton" type="button" onClick={closeModal}>
          No (Keep review){" "}
        </button>
      </div>
    </div>
  );
}
