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

export default function PlaceDetail() {
  const { placeId } = useParams();
  const dispatch = useDispatch();
  const place = useSelector((state) => state.places.singlePlace);
  const productsObj = useSelector((state) => state.products.allProducts);
  const productsArr = Object.values(productsObj);

  const formattedPhone = `(${place?.phone?.slice(0, 3)}) ${place?.phone?.slice(
    3,
    6
  )}-${place?.phone?.slice(6)}`;

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(thunkGetPlaceDetail(placeId));
    dispatch(thunkGetAllProductsForPlace(placeId));
    return () => {
      dispatch(actionClearPlace());
      dispatch(actionClearProducts());
    };
  }, [dispatch, placeId]);

  const closeMenu = () => setShowMenu(false);

  if (!place.creatorId)
    return (
      <div>
        <i className="fas fa-solid fa-spinner"></i>
      </div>
    );

  return (
    <div className="placeDetailPage">
      <div
        className="backgroundPart"
        style={{
          backgroundImage: `url(${place.cover_pic})`,
          height: "300px",
          width: "100%",
          backgroundSize: "300px 300px",
          backgroundRepeat: "repeat-x",
        }}
      >
        <h2>{place.name}</h2>
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
      <div>
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
            <ProductIndexItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
