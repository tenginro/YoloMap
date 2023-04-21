import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actionClearPlace, thunkGetPlaceDetail } from "../../store/place";

import "./PlaceDetail.css";
import MapPageInDetail from "./Map";
import {
  actionClearPlaceAllProducts,
  thunkGetAllProductsForPlace,
} from "../../store/product";
import ProductIndexItem from "./ProductIndexItem";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import CreateProductModal from "../CreateProductModal";

export default function PlaceDetail() {
  const { placeId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const place = useSelector((state) => state.places.singlePlace);
  const productsObj = useSelector((state) => state.products.allProducts);
  const productsArr = Object.values(productsObj);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(thunkGetPlaceDetail(placeId));
    dispatch(thunkGetAllProductsForPlace(placeId));
    return () => {
      dispatch(actionClearPlace());
      dispatch(actionClearPlaceAllProducts());
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
        <div className="locationHours">
          <h3>Location & Hours</h3>
          <div className="locationLine">
            <div className="locationPart">
              <div
                className="mapInPlaceDetail"
                onClick={(e) => alert("Feature coming soon")}
              >
                <MapPageInDetail place={place} />
              </div>
              <div>{place.address}</div>
              <div>
                {place.city}, {place.state}
              </div>
            </div>
            <div>
              {place.hours.split("; ").map((el, index) => (
                <div key={index}>{el}</div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3>Contacts</h3>
          <div>{place.website ? place.website : "No website"}</div>
          <div>{place.phone ? place.phone : "No phone number"}</div>
        </div>
      </div>
      <div>
        <h3>
          Products
          <OpenModalButton
            buttonText="Add a product"
            onItemClick={closeMenu}
            modalComponent={<CreateProductModal placeId={placeId} />}
          />
        </h3>
        <div className="productsListing">
          {productsArr?.map((product) => (
            <ProductIndexItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
