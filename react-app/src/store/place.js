const LOAD_PLACES = "places/load_all";
const LOAD_PLACE = "places/load_one";
const LOAD_USER_PLACES = "places/load_user";

const CLEAR_PLACES = "places/clear_all";
const CLEAR_PLACE = "places/clear_one";
const CREATE_PLACE = "places/create";
const UPDATE_PLACE = "places/update";
const DELETE_PLACE = "places/delete";

export const actionLoadAllPlaces = (places) => ({
  type: LOAD_PLACES,
  places,
});

export const actionLoadOnePlace = (place) => ({
  type: LOAD_PLACE,
  place,
});

export const actionLoadUserPlaces = (places) => ({
  type: LOAD_USER_PLACES,
  places,
});

export const actionClearPlaces = () => ({
  type: CLEAR_PLACES,
});

export const actionClearPlace = () => ({
  type: CLEAR_PLACE,
});

export const actionCreatePlace = (place) => ({
  type: CREATE_PLACE,
  place,
});

export const actionUpdatePlace = (place) => ({
  type: UPDATE_PLACE,
  place,
});

export const actionDeletePlace = (id) => ({
  type: DELETE_PLACE,
  id,
});

export const thunkGetAllPlaces = () => async (dispatch) => {
  const response = await fetch("/api/places/");
  if (response.ok) {
    const places = await response.json();
    await dispatch(actionLoadAllPlaces(places));
    return places;
  }
  return await response.json();
};

export const thunkGetSearchedPlaces = (searchQuery) => async (dispatch) => {
  const response = await fetch(`/api/places/search/${searchQuery}`);

  if (response.ok) {
    const places = await response.json();
    await dispatch(actionLoadAllPlaces(places));
    return places;
  }
  // return await response.json();
};

export const thunkGetPlaceDetail = (id) => async (dispatch) => {
  const response = await fetch(`/api/places/${id}`);

  if (response.ok) {
    const place = await response.json();
    await dispatch(actionLoadOnePlace(place));
    return place;
  }
  return await response.json();
};

export const thunkGetUserPlaces = () => async (dispatch) => {
  const response = await fetch("/api/places/current");
  if (response.ok) {
    const places = await response.json();
    await dispatch(actionLoadUserPlaces(places));
    return places;
  }
  return await response.json();
};

export const thunkCreatePlace = (place) => async (dispatch) => {
  const response = await fetch("/api/places/new", {
    method: "POST",
    body: place,
  });

  if (response.ok) {
    const newPlace = await response.json();
    await dispatch(actionCreatePlace(newPlace));
    return newPlace;
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

export const thunkUpdatePlace = (place, placeId) => async (dispatch) => {
  const response = await fetch(`/api/places/${placeId}/edit`, {
    method: "PATCH",
    body: place,
  });

  if (response.ok) {
    const updatedPin = await response.json();
    await dispatch(actionUpdatePlace(updatedPin));
    return updatedPin;
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

export const thunkDeletePlace = (place) => async (dispatch) => {
  const response = await fetch(`/api/places/${place.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await dispatch(actionDeletePlace(place.id));
    return await response.json();
  }
  return await response.json();
};

const initialState = {
  allPlaces: {},
  singlePlace: {},
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PLACES:
      const allPlaces = {};
      action.places.forEach((p) => {
        allPlaces[p.id] = p;
      });
      return { ...state, allPlaces: { ...allPlaces } };
    case LOAD_PLACE:
      return { ...state, singlePlace: { ...action.place } };
    case LOAD_USER_PLACES:
      const allUserPlaces = {};
      action.places.forEach((p) => {
        allUserPlaces[p.id] = p;
      });
      return { ...state, allPlaces: { ...allUserPlaces } };
    case CREATE_PLACE:
      return {
        ...state,
        allPlaces: { ...state.allPlaces, [action.place.id]: action.place },
      };
    case UPDATE_PLACE:
      return {
        ...state,
        allPlaces: { ...state.allPlaces, [action.place.id]: action.place },
      };
    case DELETE_PLACE:
      const newState = { ...state };
      delete newState.allPlaces[action.id];
      return newState;
    case CLEAR_PLACES:
      return { ...state, allPlaces: {} };
    case CLEAR_PLACE:
      return { ...state, singlePlace: {} };
    default:
      return state;
  }
};
export default placeReducer;
