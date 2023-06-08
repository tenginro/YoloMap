import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

const PlaceIndexItem = ({ place }) => {
  const history = useHistory();

  useEffect(() => {
    // Whenever a route change occurs (including redirects), the callback function inside the useEffect will be triggered, and it will scroll the window to the top using window.scrollTo(0, 0). This ensures that the page is scrolled to the top
    const unListen = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unListen();
    };
  }, [history]);

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
