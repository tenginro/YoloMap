import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import OpenModalMenuItem from "../OpenModalMenuItem";
import DeletePlaceModal from "../DeletePlaceModal";

const UserPlaceIndexItem = ({ place }) => {
  const history = useHistory();

  const onClickUpdate = (e) => {
    e.preventDefault();
    return history.push(`/places/${place.id}/edit`);
  };

  return (
    <div className="userProfileIndexItemPage">
      <div className="userPlaceButtons">
        <button onClick={onClickUpdate} className="updateButtonItem">
          <NavLink exact to={`/places/${place.id}/edit`} place={place}>
            <div style={{ color: "white" }}>Update</div>
          </NavLink>
        </button>
        <button className="deleteButtonItem">
          <OpenModalMenuItem
            itemText="Delete"
            // onItemClick={closeMenu}
            modalComponent={<DeletePlaceModal place={place} />}
          />
        </button>
      </div>
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
    </div>
  );
};
export default UserPlaceIndexItem;
