import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const MapPage = ({ placesArr, selectedPlaceFromAllPlaces }) => {
  const history = useHistory();
  const [map, setMap] = useState(null);

  console.log("selectedPlaceFromAllPlaces", selectedPlaceFromAllPlaces);
  const [selectedPlace, setSelectedPlace] = useState(
    selectedPlaceFromAllPlaces
  );

  console.log("selectedPlace", selectedPlace);

  //This sets the center of the map. This must be set BEFORE the map loads
  const [currentPosition, setCurrentPosition] = useState({
    lat: 42.3770029,
    lng: -71.1188488,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });

  const containerStyle = {
    width: "420px",
    height: "100vh",
    position: "relative",
    marginTop: "20px",
  };

  const iconCurrent = {
    // M - move to a point; L - draw a line from current point to a new point; Z - close the current path
    path: "M 8 0 L 10.472 6.472 L 17.472 7.472 L 12.472 12.472 L 13.472 19.472 L 8 16 L 2.528 19.472 L 3.528 12.472 L -1.472 7.472 L 5.528 6.472 Z",
    fillColor: "pink",
    fillOpacity: 1,
    // border color
    strokeColor: "red",
    strokeWeight: 1,
    // size of the marker
    scale: 1.5,
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

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    // Important! Always set the container height explicitly
    <div className="map_page__container">
      <div
        style={{
          height: "100vh",
          width: "420px",
          position: "sticky",
          right: 0,
          top: 0,
        }}
      >
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            center={currentPosition}
            onUnmount={onUnmount}
          >
            <Marker
              position={currentPosition}
              title="Current"
              icon={iconCurrent}
              streetView={false}
            ></Marker>
            {placesArr?.length &&
              placesArr?.map((place) => (
                <Marker
                  key={place.id}
                  position={{ lat: +place.lat, lng: +place.lng }}
                  title={place.name}
                  icon={icon}
                  streetView={false}
                  style={{ cursor: "pointer" }}
                  onMouseOver={() => setSelectedPlace(place)}
                  onMouseOut={() => setSelectedPlace(null)}
                  onClick={() => history.push(`/places/${place.id}`)}
                >
                  {selectedPlace?.id === place.id && (
                    <InfoWindow
                      position={{ lat: +place.lat, lng: +place.lng }}
                      // options={{ closeBox: false }}
                    >
                      <div>
                        <img
                          src={place.cover_pic}
                          alt={place.name}
                          style={{ height: "120px", width: "120px" }}
                        />
                        <div>{place.name}</div>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default MapPage;
