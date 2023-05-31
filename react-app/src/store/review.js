const LOAD_PLACE_REVIEWS = "reviews/load_place_all";
const LOAD_USER_REVIEWS = "reviews/load_user_all";
const CLEAR_REVIEWS = "reviews/clear_all";
const CLEAR_REVIEW = "reviews/clear_one";

const CREATE_REVIEW = "reviews/create";
const UPDATE_REVIEW = "reviews/update";
const DELETE_REVIEW = "reviews/delete";

export const actionLoadPlaceAllReviews = (reviews) => ({
  type: LOAD_PLACE_REVIEWS,
  reviews,
});
export const actionLoadUserReviews = (reviews) => ({
  type: LOAD_USER_REVIEWS,
  reviews,
});

export const actionClearReviews = () => ({
  type: CLEAR_REVIEWS,
});
export const actionClearReview = () => ({
  type: CLEAR_REVIEWS,
});

export const actionCreateReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});
export const actionUpdateReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});
export const actionDeleteReview = (id) => ({
  type: DELETE_REVIEW,
  id,
});

export const thunkGetAllReviewsForPlace = (placeId) => async (dispatch) => {
  const response = await fetch(`/api/places/${placeId}/reviews`);
  if (response.ok) {
    const allReviews = await response.json();
    await dispatch(actionLoadPlaceAllReviews(allReviews));
    return allReviews;
  }
  return await response.json();
};

export const thunkGetUserReviews = () => async (dispatch) => {
  const response = await fetch("/api/reviews/current");

  if (response.ok) {
    const reviews = await response.json();
    await dispatch(actionLoadUserReviews(reviews));
    return reviews;
  }
  return await response.json();
};

export const thunkCreateReview = (review) => async (dispatch) => {
  const response = await fetch(`/api/reviews/new`, {
    method: "POST",
    body: review,
  });
  if (response.ok) {
    const newReview = await response.json();
    await dispatch(actionCreateReview(newReview));
    return newReview;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      const errorsArr = data.errors;
      let errorsObj = {};
      errorsArr.forEach((err) => {
        const [key, value] = err.split(": ");
        errorsObj[key] = value;
      });
      return { errors: errorsObj };
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const thunkUpdateReview = (review, reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}/edit`, {
    method: "PATCH",
    body: review,
  });

  if (response.ok) {
    const updatedReview = await response.json();
    await dispatch(actionCreateReview(updatedReview));
    return updatedReview;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      const errorsArr = data.errors;
      let errorsObj = {};
      errorsArr.forEach((err) => {
        const [key, value] = err.split(": ");
        errorsObj[key] = value;
      });
      return { errors: errorsObj };
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const thunkDelateReview = (review) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${review.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await dispatch(actionDeleteReview(review.id));
    return await response.json();
  }
  return await response.json();
};

const initialState = {
  allReviews: {},
  singleReview: {},
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PLACE_REVIEWS:
      const all = {};
      action.reviews.forEach((p) => {
        all[p.id] = p;
      });
      return { ...state, allReviews: { ...all } };
    case LOAD_USER_REVIEWS:
      const reviews = {};
      action.reviews.forEach((p) => {
        reviews[p.id] = p;
      });
      return { ...state, allReviews: { ...reviews } };
    case CREATE_REVIEW:
      return {
        ...state,
        allReviews: {
          ...state.allReviews,
          [action.review.id]: action.review,
        },
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        allReviews: {
          ...state.allReviews,
          [action.review.id]: action.review,
        },
      };
    case DELETE_REVIEW:
      const newState = { ...state };
      delete newState.allReviews[action.id];
      return newState;
    case CLEAR_REVIEWS:
      return { ...state, allReviews: {} };
    case CLEAR_REVIEW:
      return { ...state, singleReview: {} };
    default:
      return state;
  }
};
export default reviewReducer;
