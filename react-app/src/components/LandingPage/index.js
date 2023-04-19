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
    }, 3000);
    return () => clearInterval(intervalFunc);
  }, [index, length]);

  const backgroundStyle1 = {
    backgroundImage: `url(${allBackgroundImages[index]})`,
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: 0,
  };

  return (
    <div className="main-page-container" style={backgroundStyle1}>
      <h2
        style={{
          fontSize: "100px",
          color: "white",
          paddingLeft: "100px",
          fontWeight: "900",
          zIndex: 2,
        }}
      >
        <div>You only live once. </div>
        <div>So plan it better.</div>
      </h2>
    </div>
  );
}
