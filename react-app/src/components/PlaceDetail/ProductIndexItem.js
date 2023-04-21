export default function ProductIndexItem({ product }) {
  return (
    <div className="productIndex">
      <img src={product.cover_pic} alt="productCoverPic"></img>
      <div>
        <h4>{product.name}</h4>
        <div>{product.description}</div>
        <div>${product.price}</div>
      </div>
    </div>
  );
}
