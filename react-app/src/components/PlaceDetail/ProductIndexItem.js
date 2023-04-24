import { useDispatch, useSelector } from "react-redux";
import { thunkAddToCart, thunkGetUserCart } from "../../store/cart";

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
    } else {
      alert("You do not have enough budget");
    }
  };

  return (
    <div className="productIndex">
      <img src={product.cover_pic} alt="productCoverPic"></img>
      <div>
        <h4>{product.name}</h4>
        <div>{product.description}</div>
        <div>${product.price}</div>
        <button className="CartButton" onClick={onClick}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
