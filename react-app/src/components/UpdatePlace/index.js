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

  if (!place) {
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

  if (place && place.name) return <UpdatePlaceForm place={place} />;
}
