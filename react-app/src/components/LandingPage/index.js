import { useEffect, useState } from "react";
import image1 from "./backgroundImages/background1.jpeg";
import image2 from "./backgroundImages/background2.jpeg";
import image3 from "./backgroundImages/background3.jpeg";
import image4 from "./backgroundImages/background4.jpeg";
import "./LandingPage.css";

export default function LandingPage() {
  const allBackgroundImages = [image1, image2, image3, image4];
  const [index, setIndex] = useState(0);

  const length = allBackgroundImages.length;

  useEffect(() => {
    const intervalFunc = setInterval(() => {
      setIndex((index + 1) % length);
    }, 5000);
    return () => clearInterval(intervalFunc);
  }, [index, length]);

  const backgroundStyle1 = {
    backgroundImage: `url(${allBackgroundImages[index]})`,
    height: "70vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: 0,
  };

  return (
    <>
      <div className="main-page-container" style={backgroundStyle1}>
        <h2
          style={{
            fontSize: "100px",
            color: "white",
            paddingLeft: "100px",
            fontWeight: "900",
            zIndex: 2,
            textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div>You only live once. </div>
          <div>So plan it better.</div>
        </h2>
      </div>
      <div className="categoriesContainer">
        <h3>Categories</h3>
        <div className="allCateContainer">
          <div
            className="eachCateContainer"
            onClick={(e) => alert("Feature coming soon")}
          >
            <i className="fa-solid fa-palette fa-2x"></i>
            <div>Art</div>
          </div>
          <div
            className="eachCateContainer"
            onClick={(e) => alert("Feature coming soon")}
          >
            <i className="fa-solid fa-cake-candles fa-2x"></i>
            <div>Bakery</div>
          </div>
          <div
            className="eachCateContainer"
            onClick={(e) => alert("Feature coming soon")}
          >
            <i className="fa-solid fa-wine-glass fa-2x"></i>
            <div>Bar</div>
          </div>
          <div
            className="eachCateContainer"
            onClick={(e) => alert("Feature coming soon")}
          >
            <i className="fa-solid fa-mug-saucer fa-2x"></i>
            <div>Coffee/Tea</div>
          </div>
          <div
            className="eachCateContainer"
            onClick={(e) => alert("Feature coming soon")}
          >
            <i className="fa-solid fa-utensils fa-2x"></i>
            <div>Restaurant</div>
          </div>
          <div
            className="eachCateContainer"
            onClick={(e) => alert("Feature coming soon")}
          >
            <i className="fa-solid fa-plane fa-2x"></i>
            <div>Travel</div>
          </div>
        </div>
      </div>
    </>
  );
}
