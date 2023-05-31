import { useHistory } from "react-router-dom";

import OpenModalMenuItem from "../OpenModalMenuItem";

export default function UserReviewIndexItem({ review }) {
  const history = useHistory();

  return (
    <div className="reviewIndexInUserProfile">
      <div
        style={{
          width: "100%",
          height: "auto",
          overflowWrap: "break-word",
          margin: "10px 0",
        }}
      >
        <i className="fas fa-sharp fa-solid fa-star"> {review.rating}</i> review
        in{" "}
        <span
          className="placeForProduct"
          onClick={(e) => {
            e.preventDefault();
            history.push(`/places/${review.place.id}`);
          }}
        >
          {review.place.name}
        </span>
        : {review.review}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "500px",
          overflowX: "auto",
        }}
      >
        {review.reviewImages.length ? (
          review.reviewImages.map((i) => (
            <div key={i.id}>
              <img
                style={{ width: "150px", height: "150px" }}
                src={i.url}
                alt="reviewPic"
              ></img>
            </div>
          ))
        ) : (
          <div>No images added for this review yet.</div>
        )}
      </div>
    </div>
  );
}
