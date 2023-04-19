import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { thunkGetAllPlaces } from "../../store/place";
import UpdatePlaceForm from "./UpdatePlaceForm";

export default function UpdatePlaceWrapper() {
  const dispatch = useDispatch();
  const { placeId } = useParams();
  const places = useSelector((state) => state.places.allPlaces);
  const place = places[placeId];

  useEffect(() => {
    dispatch(thunkGetAllPlaces());
  }, [dispatch]);

  if (!place) return <div>Loading</div>;
  if (place && place.name) return <UpdatePlaceForm place={place} />;
}
