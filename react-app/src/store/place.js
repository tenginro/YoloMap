const LOAD_Places = "places/load_all";
const LOAD_Place = "places/load_one";
const LOAD_User_Places = "places/load_user";
const CLEAR_Places = "places/clear_all";
const CLEAR_Place = "places/clear_one";

export const actionLoadAllPlaces = (places) => ({
  type: LOAD_Places,
  places,
});

export const actionLoadOnePlace = (place) => ({
  type: LOAD_Place,
  place,
});

export const actionLoadUserPlaces = (places) => ({
  type: LOAD_User_Places,
  places,
});

export const actionClearPlaces = () => ({
  type: CLEAR_Places,
});

export const actionClearPlace = () => ({
  type: CLEAR_Place,
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

export const thunkGetPlaceDetail = (id) => async (dispatch) => {
  const response = await fetch(`/api/places/${id}`);

  if (response.ok) {
    const place = await response.json();
    console.log(place);
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

const initialState = {
  allPlaces: {},
  singlePlace: {},
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_Places:
      const allPlaces = {};
      action.places.forEach((p) => {
        allPlaces[p.id] = p;
      });
      return { ...state, allPlaces: { ...allPlaces } };
    case LOAD_Place:
      return { ...state, singlePlace: { ...action.place } };
    case LOAD_User_Places:
      const allUserPlaces = {};
      action.places.forEach((p) => {
        allUserPlaces[p.id] = p;
      });
      return { ...state, allPlaces: { ...allUserPlaces } };
    case CLEAR_Places:
      return { ...state, allPlaces: {} };
    case CLEAR_Place:
      return { ...state, singlePlace: {} };
    default:
      return state;
  }
};
export default placeReducer;
