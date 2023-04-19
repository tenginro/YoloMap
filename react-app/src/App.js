import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllPlaces from "./components/AllPlaces";
import PlaceDetail from "./components/PlaceDetail";
import LandingPage from "./components/LandingPage";
import UserProfile from "./components/UserProfile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/places">
            <AllPlaces />
          </Route>
          <Route exact path="/places/:placeId">
            <PlaceDetail />
          </Route>
          <Route exact path="/current">
            <UserProfile />
          </Route>
          <Route>
            <h2>404: Page not found</h2>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
