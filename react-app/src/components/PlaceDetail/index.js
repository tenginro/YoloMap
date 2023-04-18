import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actionClearPlace, thunkGetPlaceDetail } from "../../store/place";

import "./PlaceDetail.css";

export default function PlaceDetail() {
  const { placeId } = useParams();
  const dispatch = useDispatch();
  const place = useSelector((state) => state.places.singlePlace);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetPlaceDetail(placeId));
    return () => dispatch(actionClearPlace());
  }, [dispatch, placeId]);

  if (!place.creatorId)
    return (
      <div>
        <i className="fas fa-solid fa-spinner"></i>
      </div>
    );

  return (
    <div className="placeDetailPage">
      <div>
        <img src={place.cover_pic} alt="placeCoverPic" title={place.name}></img>
        <h2>{place.name}</h2>
      </div>
      <div className="secondPart">
        <div className="locationHours">
          <h3>Location & Hours</h3>
          <div className="locationLine">
            <div className="locationPart">
              <div
                className="mapInPlaceDetail"
                onClick={(e) => alert("Feature coming soon")}
              >
                Map
              </div>
              <div>{place.address}</div>
              <div>
                {place.city}, {place.state}
              </div>
            </div>
            <div>
              {place.hours.split("; ").map((el) => (
                <div>{el}</div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3>Contacts</h3>
          <div>{place.website ? place.website : "No website"}</div>
          <div>{place.phone ? place.phone : "No phone number"}</div>
        </div>
      </div>
    </div>
  );
}
