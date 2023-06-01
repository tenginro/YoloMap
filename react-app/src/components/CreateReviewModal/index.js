import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

import {
  thunkAddReviewImage,
  thunkCreateReview,
  thunkUpdateReview,
} from "../../store/review";

import "./CreateReviewModal.css";

export default function CreateReviewModal({
  placeId,
  productId,
  orireview,
  page,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const [review, setReview] = useState(orireview?.review || "");
  const [activeRating, setActiveRating] = useState(orireview?.rating || 0);
  const [realRating, setRealRating] = useState(orireview?.rating || 0);
  const [url, setUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const onClick = async (e) => {
    e.preventDefault();
    setErrorMessage({});

    const formData = new FormData();
    formData.append("review", review);
    formData.append("rating", realRating);
    formData.append("productId", productId);

    let response;

    if (!page) {
      response = await dispatch(thunkCreateReview(formData));
    } else {
      response = await dispatch(thunkUpdateReview(formData, orireview.id));
    }

    if (response.errors) {
      setImageLoading(false);
      setErrorMessage(response.errors);
    } else {
      if (url.length) {
        for (let el of url) {
          const imagesData = new FormData();
          imagesData.append("reviewId", response.id);
          imagesData.append("url", el);
          setImageLoading(true);
          let imageResponse = await dispatch(
            thunkAddReviewImage(imagesData, placeId)
          );
          // if (imageResponse.errors) {
          //   setImageLoading(false);
          //   setErrorMessage(imageResponse.errors);
          // }
        }
      }
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
        {!page ? (
          <div>
            <label style={{ margin: "0 auto", textAlign: "center" }}>
              Image(optional):{" "}
              <input
                id="coverPicProductInput"
                type="file"
                //   "accept" attribute restricts the types of files that can be selected to only images
                accept="image/*"
                onChange={(e) => setUrl(Array.from(e.target.files))}
                // to allow multiple files upload, need to change to Array.from(e.target.files) above
                multiple
              />
            </label>
            {errorMessage?.url && (
              <div className="errors">{errorMessage.url}</div>
            )}
          </div>
        ) : null}

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
