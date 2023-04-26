import { useDispatch, useSelector } from "react-redux";
import { thunkAddToCart, thunkGetUserCart } from "../../store/cart";
import OpenModalMenuItem from "../OpenModalMenuItem";
import AddCartConfirm from "./AddCartConfirm";
import BetterPlanAlert from "../Navigation/BetterPlanAlert";

export default function ProductIndexItem({ product }) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const productId = product.id;
  const onClick = async (e) => {
    e.preventDefault();

    if (user.budget - product.price > 0) {
      const formData = new FormData();
      formData.append("productId", productId);
      await dispatch(thunkAddToCart(formData)).then(() =>
        dispatch(thunkGetUserCart())
      );
      // } else {
      //   alert("You do not have enough budget");
    }
  };

  return (
    <div className="productIndex">
      <img src={product.cover_pic} alt="productCoverPic"></img>
      <div>
        <h4>{product.name}</h4>
        <div
          style={{
            width: "300px",
            height: "30px",
            overflowWrap: "break-word",
            overflowY: "auto",
            marginBottom: "5px",
          }}
        >
          {product.description}
        </div>
        <div>${product.price}</div>
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
  );
}
