import { useHistory } from "react-router-dom";

import DeleteProductModal from "../DeleteProductModal";
import UpdateProductModal from "../UpdateProductModal";
import OpenModalMenuItem from "../OpenModalMenuItem";

export default function UserProductIndexItem({ product }) {
  const history = useHistory();

  return (
    <div className="productIndexInUserProfile">
      <div className="userProductButtons">
        <button className="updateButtonItem">
          <OpenModalMenuItem
            itemText="Update"
            modalComponent={
              <UpdateProductModal product={product} placeId={product.placeId} />
            }
          />
        </button>
        <button className="deleteButtonItem">
          <OpenModalMenuItem
            itemText="Delete"
            modalComponent={<DeleteProductModal product={product} />}
          />
        </button>
      </div>
      <div className="productInformation">
        <img src={product.cover_pic} alt="productCoverPic"></img>
        <div>
          <h4>
            <div>{product.name}</div>
            <div
              className="placeForProduct"
              onClick={(e) => {
                e.preventDefault();
                history.push(`/places/${product.place.id}`);
              }}
            >
              in {product?.place?.name}
            </div>
          </h4>
          <div
            style={{
              width: "330px",
              height: "30px",
              overflowWrap: "break-word",
              overflowY: "auto",
              marginBottom: "5px",
            }}
          >
            {product.description}
          </div>
          <div>${product.price}</div>
        </div>
      </div>
    </div>
  );
}
