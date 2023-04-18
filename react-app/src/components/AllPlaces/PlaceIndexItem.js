import { NavLink } from "react-router-dom";

const PlaceIndexItem = ({ place }) => {
  return (
    <NavLink to={`/places/${place.id}`}>
      <div className="placeIndexItem">
        <div className="placeLeftPart">
          <img
            src={place.cover_pic}
            alt="placeCoverPic"
            title={place.name}
          ></img>
        </div>
        <div className="placeRightPart">
          <div>{place.name}</div>
          <div>{place.description}</div>
          <div>
            {place.city}, {place.state}
          </div>
        </div>
      </div>
    </NavLink>
  );
};
export default PlaceIndexItem;
