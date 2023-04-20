import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const MapPageInDetail = ({ place }) => {
  //This sets the center of the map. This must be set BEFORE the map loads
  const [currentPosition, setCurrentPosition] = useState({
    lat: +place.lat,
    lng: +place.lng,
  });

  // This is the equivalent to a script tag
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });

  const containerStyle = {
    width: "315px",
    height: "150px",
  };
  const icon = {
    // M - move to a point; L - draw a line from current point to a new point; Z - close the current path
    path: "M 8 0 L 10.472 6.472 L 17.472 7.472 L 12.472 12.472 L 13.472 19.472 L 8 16 L 2.528 19.472 L 3.528 12.472 L -1.472 7.472 L 5.528 6.472 Z",
    fillColor: "#01b636",
    fillOpacity: 1,
    // border color
    strokeColor: "#74E39A",
    strokeWeight: 1,
    // size of the marker
    scale: 1.5,
  };

  const [map, setMap] = useState(null);
  const [placeImg, setPlaceImg] = useState("");

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    // Important! Always set the container height explicitly
    <div className="map_page__container">
      <div style={{ height: "150px", width: "315px" }}>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={14}
            center={currentPosition}
            onUnmount={onUnmount}
          >
            <Marker
              position={currentPosition}
              title="place.name"
              icon={icon}
              streetView={false}
            ></Marker>
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default MapPageInDetail;
