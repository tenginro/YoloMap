import { useDispatch, useSelector } from "react-redux";
import { thunkAddToCart, thunkGetUserCart } from "../../store/cart";
import OpenModalMenuItem from "../OpenModalMenuItem";
import AddCartConfirm from "./AddCartConfirm";
import BetterPlanAlert from "../Navigation/BetterPlanAlert";
import CreateReviewModal from "../CreateReviewModal";

export default function ProductIndexItem({ product, reviews, placeId }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const productId = product.id;
  const onClick = async (e) => {
    e.preventDefault();

    if (user.budget - product.price > 0) {
      const formData = new FormData();
      formData.append("productId", productId);
      await dispatch(thunkAddToCart(formData)).then(() =>
        dispatch(thunkGetUserCart())
      );
    }
  };

  return (
    <div className="productIndex">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "10px",
        }}
      >
        <div>
          <img src={product.cover_pic} alt="productCoverPic"></img>
        </div>
        <div>
          <div>
            <h4>
              {product.name} ${product.price}
            </h4>
            <div
              style={{
                maxWidth: "300px",
                width: "50%",
                height: "30px",
                overflowWrap: "break-word",
                overflowY: "auto",
                marginBottom: "5px",
              }}
            >
              {product.description}
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            {user.budget - product.price > 0 ? (
              <button className="CartButton" onClick={onClick}>
                <OpenModalMenuItem
                  itemText="Add to Cart"
                  modalComponent={<AddCartConfirm />}
                />
              </button>
            ) : (
              <button className="CartButton" onClick={onClick}>
                <OpenModalMenuItem
                  itemText="Add to Cart"
                  modalComponent={<BetterPlanAlert />}
                />
              </button>
            )}
          </div>
        </div>
      </div>
      {reviews.length ? (
        <div
          style={{
            width: "85%",
            maxHeight: "350px",
            height: "auto",
            marginLeft: "50px",
            overflowY: "auto",
          }}
        >
          <h3>Reviews for the product:</h3>
          <div>
            <button className="CartButton">
              <OpenModalMenuItem
                itemText="Post Your Review"
                modalComponent={
                  <CreateReviewModal placeId={placeId} productId={product.id} />
                }
              />
            </button>
          </div>
          {reviews.map((review) => (
            <div key={review.id}>
              <h4
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: "10px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <div>
                  <img
                    style={{ width: "30px", height: "30px" }}
                    src={review.reviewOwner.profile_pic}
                    alt="profilePic"
                  ></img>
                </div>
                <div>{review.reviewOwner.username}</div>
              </h4>
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  overflowY: "auto",
                  overflowWrap: "break-word",
                }}
              >
                <i className="fas fa-sharp fa-solid fa-star">
                  {" "}
                  {review.rating}
                </i>{" "}
                review: {review.review}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "500px",
                  overflowX: "auto",
                }}
              >
                {review.reviewImages.map((i) => (
                  <div key={i.id}>
                    <img
                      style={{ width: "150px", height: "150px" }}
                      src={i.url}
                      alt="reviewPic"
                    ></img>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            width: "600px",
            marginLeft: "50px",
            overflowY: "auto",
          }}
        >
          <h3>Reviews for the product:</h3>
          <div>
            <button className="CartButton">
              <OpenModalMenuItem
                itemText="Post Your Review"
                modalComponent={
                  <CreateReviewModal placeId={placeId} productId={product.id} />
                }
              />
            </button>
          </div>
          <div>No reviews for this product yet.</div>
        </div>
      )}
    </div>
  );
}
