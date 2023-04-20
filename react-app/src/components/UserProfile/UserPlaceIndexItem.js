import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";

import OpenModalMenuItem from "../OpenModalMenuItem";
import DeletePlaceModal from "../DeletePlaceModal";

const UserPlaceIndexItem = ({ place }) => {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = (e) => {
    e.stopPropagation();
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      // you want the dropdown menu to close only if the click happened OUTSIDE the dropdown.
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const onClickUpdate = (e) => {
    e.preventDefault();
    return history.push(`/places/${place.id}/edit`);
  };

  return (
    <div className="userProfileIndexItemPage">
      <div className="userPlaceButtons">
        <button onClick={onClickUpdate} className="updatePlaceButton">
          <NavLink exact to={`/places/${place.id}/edit`} place={place}>
            Update
          </NavLink>
        </button>
        <button className="deletePlaceButton">
          <OpenModalMenuItem
            itemText="Delete"
            onItemClick={closeMenu}
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
                this.src =
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
            <div className="descriptionAllPins">{place.description}</div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};
export default UserPlaceIndexItem;
