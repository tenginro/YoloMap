import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actionClearPlace, thunkGetPlaceDetail } from "../../store/place";

import "./PlaceDetail.css";
import MapPageInDetail from "./Map";
import {
  actionClearProducts,
  thunkGetAllProductsForPlace,
} from "../../store/product";
import ProductIndexItem from "./ProductIndexItem";
import OpenModalButton from "../OpenModalButton";
import CreateProductModal from "../CreateProductModal";
import NotFound from "../NotFound";
import {
  actionClearReviews,
  thunkGetAllReviewsForPlace,
} from "../../store/review";

export default function PlaceDetail() {
  const { placeId } = useParams();
  const dispatch = useDispatch();

  const place = useSelector((state) => state.places.singlePlace);
  const productsObj = useSelector((state) => state.products.allProducts);
  const productsArr = Object.values(productsObj);
  const reviewsObj = useSelector((state) => state.reviews.allReviews);
  const reviewsArr = Object.values(reviewsObj);
  let reviewImages = [];
  reviewsArr.forEach((review) => {
    review.reviewImages.forEach((i) => reviewImages.push(i));
  });
  console.log("reviewImagesUrl", reviewImages);

  const formattedPhone = `(${place?.phone?.slice(0, 3)}) ${place?.phone?.slice(
    3,
    6
  )}-${place?.phone?.slice(6)}`;

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(thunkGetPlaceDetail(placeId));
    dispatch(thunkGetAllProductsForPlace(placeId));
    dispatch(thunkGetAllReviewsForPlace(placeId));
    return () => {
      dispatch(actionClearPlace());
      dispatch(actionClearProducts());
      dispatch(actionClearReviews());
    };
  }, [dispatch, placeId]);

  const closeMenu = () => setShowMenu(false);

  if (!place.creatorId) {
    if (+placeId < 1 || +placeId % 1 !== 0) {
      return <NotFound />;
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <img
          src="https://assets-global.website-files.com/5c7fdbdd4e3feeee8dd96dd2/6134707265a929f4cdfc1f6d_5.gif"
          alt="Loading"
        ></img>
      </div>
    );
  }

  return (
    <div className="placeDetailPage">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <div
          className="backgroundPart"
          style={{
            backgroundImage: `url(${place.cover_pic})`,
            // backgroundImage: `${productsImages}`,
            height: "300px",
            width: "500px",
            backgroundSize: "500px",
            /*  instructs the browser to scale the image or video to cover the entire available space within its container, while maintaining the aspect ratio */
            objectFit: "cover",
            backgroundPosition: "center",
            // backgroundRepeat: productsArr.length ? null : "repeat-x",
          }}
        >
          <h2>{place.name}</h2>
        </div>
        {productsArr?.length
          ? productsArr.map((p) => (
              <div
                key={p.id}
                className="backgroundPart"
                style={{
                  backgroundImage: `url(${p.cover_pic})`,
                  height: "300px",
                  width: "500px",
                  backgroundSize: "500px",
                  objectFit: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            ))
          : null}
        {reviewImages?.length
          ? reviewImages.map((i) => (
              <div
                key={i.id}
                className="backgroundPart"
                style={{
                  backgroundImage: `url(${i.url})`,
                  height: "300px",
                  width: "500px",
                  backgroundSize: "500px",
                  objectFit: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            ))
          : null}
      </div>
      <div className="secondPart">
        <div className="descriptionContainerInPlaceDetail">
          <h3>Description</h3>
          <div className="descriptionInPlaceDetail">
            {place.description || "No description yet"}
          </div>
        </div>
        <div className="secondSecondPart">
          <div className="locationHours">
            <h3>Location & Hours</h3>
            <div className="locationLine">
              <div className="locationPart">
                <div className="mapInPlaceDetail">
                  <MapPageInDetail place={place} />
                </div>
                <div>
                  <div>{place.address}</div>
                  <div>
                    {place.city}, {place.state}
                  </div>
                </div>
              </div>
              <div className="hoursInfoContainer">
                {place.hours.split("; ").map((el, index) => (
                  <div key={index}>{el}</div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3>Contacts</h3>
            <div className="websiteAndPhone">
              <div className="placeWebsite">
                {place.website ? (
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {place.website}{" "}
                    <i className="fas fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                ) : (
                  "No website"
                )}
              </div>
              <div className="phoneContact">
                {place.phone ? formattedPhone : "No phone number"}{" "}
                <i className="fas fa-solid fa-square-phone"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="listingPlaceProducts">
        <div className="addProductContainer">
          <h3>Products</h3>
          <div>
            <OpenModalButton
              buttonText="Want to add a new product?"
              onItemClick={closeMenu}
              modalComponent={<CreateProductModal placeId={placeId} />}
            />
          </div>
        </div>
        <div className="productsListing">
          {productsArr?.map((product) => (
            <ProductIndexItem
              key={product.id}
              product={product}
              reviews={reviewsArr.filter((el) => el.productId === product.id)}
            />
          ))}
          {!productsArr?.length && (
            <div>
              Did you know you can create a product in the place detail page to
              help other users discover the businesses and show off your own
              great taste? Welcome to YoloMap!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
