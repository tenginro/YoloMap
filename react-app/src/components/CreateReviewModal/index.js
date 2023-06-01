import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

import { thunkCreateReview } from "../../store/review";

import "./CreateReviewModal.css";

export default function CreateReviewModal({ placeId, productId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const [review, setReview] = useState("");
  const [activeRating, setActiveRating] = useState(0);
  const [realRating, setRealRating] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const onClick = async (e) => {
    e.preventDefault();
    setErrorMessage({});

    const formData = new FormData();
    formData.append("review", review);
    formData.append("rating", realRating);
    formData.append("productId", productId);

    let response = await dispatch(thunkCreateReview(formData));

    if (response.errors) {
      setImageLoading(false);
      setErrorMessage(response.errors);
    } else {
      setImageLoading(false);
      setErrorMessage({});
      closeModal();
      return history.push(`/places/${placeId}`);
    }
  };

  return (
    <div id="createReviewForm">
      <h2>How was your stay?</h2>
      <form>
        {errorMessage?.review && (
          <div className="errors">{errorMessage.review}</div>
        )}
        <textarea
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave your review here... (minimum 10 characters)"
        ></textarea>

        <div className="rating-input">
          <div>Rating*: </div>
          <div
            className={
              activeRating >= 1 ? "reviewStar filled" : "reviewStar empty"
            }
            onMouseEnter={() => {
              setActiveRating(1);
            }}
            onMouseLeave={() => {
              setActiveRating(realRating);
            }}
            onClick={() => {
              setRealRating(1);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
          <div
            className={
              activeRating >= 2 ? "reviewStar filled" : "reviewStar empty"
            }
            onMouseEnter={() => {
              setActiveRating(2);
            }}
            onMouseLeave={() => {
              setActiveRating(realRating);
            }}
            onClick={() => {
              setRealRating(2);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
          <div
            className={
              activeRating >= 3 ? "reviewStar filled" : "reviewStar empty"
            }
            onMouseEnter={() => {
              setActiveRating(3);
            }}
            onMouseLeave={() => {
              setActiveRating(realRating);
            }}
            onClick={() => {
              setRealRating(3);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
          <div
            className={
              activeRating >= 4 ? "reviewStar filled" : "reviewStar empty"
            }
            onMouseEnter={() => {
              setActiveRating(4);
            }}
            onMouseLeave={() => {
              setActiveRating(realRating);
            }}
            onClick={() => {
              setRealRating(4);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
          <div
            className={
              activeRating >= 5 ? "reviewStar filled" : "reviewStar empty"
            }
            onMouseEnter={() => {
              setActiveRating(5);
            }}
            onMouseLeave={() => {
              setActiveRating(realRating);
            }}
            onClick={() => {
              setRealRating(5);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
        </div>

        <div className="submitReview">
          <button
            className={
              review.length <= 10 || realRating < 1
                ? "submitReviewButtonDisabled"
                : "submitReviewButton"
            }
            type="button"
            disabled={review.length <= 10}
            onClick={onClick}
          >
            Submit Your Review
          </button>
        </div>
      </form>
    </div>
  );
}
