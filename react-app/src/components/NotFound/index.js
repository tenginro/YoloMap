import { NavLink } from "react-router-dom";

import "./NotFound.css";

export default function NotFound() {
  return (
    <div id="notFoundPage">
      <div className="firstPartInNotFound">
        <h1>We're sorry. We can't find the page you're looking for.</h1>
        <h4>
          Please return to{" "}
          <NavLink exact to="/">
            HomePage
          </NavLink>
          .
        </h4>
      </div>
      <div>
        <img
          src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/1c54cc25ce01/assets/img/svg_illustrations/cant_find_650x520_v2.svg"
          alt="404Image"
        ></img>
      </div>
    </div>
  );
}
