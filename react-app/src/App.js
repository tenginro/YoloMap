import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";

import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllPlaces from "./components/AllPlaces";
import PlaceDetail from "./components/PlaceDetail";
import LandingPage from "./components/LandingPage";
import UserProfile from "./components/UserProfile";
import CreatePlace from "./components/CreatePlace";
import UpdatePlaceWrapper from "./components/UpdatePlace";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import SearchPlaces from "./components/SearchPlaces";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation
        isLoaded={isLoaded}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {isLoaded && (
        <Switch>
          <Route exact path="/places/new">
            <CreatePlace />
          </Route>
          <Route exact path="/places/:placeId/edit">
            <UpdatePlaceWrapper />
          </Route>
          <Route exact path="/places/:placeId">
            <PlaceDetail />
          </Route>
          <Route exact path="/places">
            <AllPlaces />
          </Route>
          <Route exact path="/places/search/:searchInput">
            <SearchPlaces
              clearSearchQuery={() => setSearchQuery("")}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Route>
          <Route exact path="/current">
            <UserProfile />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
