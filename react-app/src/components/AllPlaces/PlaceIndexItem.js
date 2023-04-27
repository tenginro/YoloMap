import { NavLink } from "react-router-dom";

const PlaceIndexItem = ({ place }) => {
  return (
    <NavLink to={`/places/${place.id}`}>
      <div className="placeIndexItem">
        <div className="placeLeftPart">
          <img
            src={place.cover_pic}
            alt="placeCoverPic"
            onError={(e) => {
              e.target.src =
                "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg";
            }}
            title={place.name}
          ></img>
        </div>
        <div className="placeRightPart">
          <h3>{place.name}</h3>
          <div>{place.category}</div>
          <div className="placeRightPartSub">
            <div>{place.address}</div>
            <div>
              {place.city}, {place.state}
            </div>
          </div>
          <div className="descriptionAllPins">
            {place.description || "No description yet"}
          </div>
        </div>
      </div>
    </NavLink>
  );
};
export default PlaceIndexItem;
