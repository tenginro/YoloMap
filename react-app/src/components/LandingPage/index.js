import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import image1 from "./backgroundImages/spring.gif";
import image2 from "./backgroundImages/summer.gif";
import image3 from "./backgroundImages/autumn.gif";
import image4 from "./backgroundImages/winter.gif";
import "./LandingPage.css";

export default function LandingPage() {
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

  const allBackgroundImages = [image1, image2, image3, image4];
  const [index, setIndex] = useState(0);

  const length = allBackgroundImages.length;

  useEffect(() => {
    const intervalFunc = setInterval(() => {
      setIndex((index + 1) % length);
    }, 3000);
    return () => clearInterval(intervalFunc);
  }, [index, length]);

  const backgroundStyle1 = {
    backgroundImage: `url(${allBackgroundImages[index]})`,
    height: "70vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: 0,
    backgroundPosition: "center",
  };

  return (
    <>
      <div className="main-page-container" style={backgroundStyle1}>
        <h2>
          <div className="slogan">You only live once. </div>
          <div className="slogan">So plan it better.</div>
        </h2>
      </div>
      <div className="categoriesContainer">
        <h3>Categories</h3>
        <div className="allCateContainer">
          <NavLink
            to={{
              pathname: "/places",
              state: { selectedCategory: "Art" },
            }}
          >
            <div className="eachCateContainer">
              <i className="fa-solid fa-palette fa-2x"></i>
              <div style={{ color: "black" }}>Art</div>
            </div>
          </NavLink>
          <NavLink
            to={{
              pathname: "/places",
              state: { selectedCategory: "Bakery" },
            }}
          >
            <div className="eachCateContainer">
              <i className="fa-solid fa-cake-candles fa-2x"></i>
              <div style={{ color: "black" }}>Bakery</div>
            </div>
          </NavLink>
          <NavLink
            to={{
              pathname: "/places",
              state: { selectedCategory: "Bar" },
            }}
          >
            <div className="eachCateContainer">
              <i className="fa-solid fa-wine-glass fa-2x"></i>
              <div style={{ color: "black" }}>Bar</div>
            </div>
          </NavLink>
          <NavLink
            to={{
              pathname: "/places",
              state: { selectedCategory: "Coffee/Tea" },
            }}
          >
            <div className="eachCateContainer">
              <i className="fa-solid fa-mug-saucer fa-2x"></i>
              <div style={{ color: "black" }}>Coffee/Tea</div>
            </div>
          </NavLink>
          <NavLink
            to={{
              pathname: "/places",
              state: { selectedCategory: "Restaurant" },
            }}
          >
            <div className="eachCateContainer">
              <i className="fa-solid fa-utensils fa-2x"></i>
              <div style={{ color: "black" }}>Restaurant</div>
            </div>
          </NavLink>
          <NavLink
            to={{
              pathname: "/places",
              state: { selectedCategory: "Travel" },
            }}
          >
            <div className="eachCateContainer">
              <i className="fa-solid fa-plane fa-2x"></i>
              <div style={{ color: "black" }}>Travel</div>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
