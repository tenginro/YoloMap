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
            zoom={10}
            center={currentPosition}
            onUnmount={onUnmount}
          >
            <Marker
              position={currentPosition}
              title="place.name"
              icon={<i className="fas fa-regular fa-star"></i>}
              streetView={false}
            ></Marker>
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default MapPageInDetail;
