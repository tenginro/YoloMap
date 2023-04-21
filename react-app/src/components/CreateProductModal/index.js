import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreateProduct } from "../../store/product";

export default function CreateProductModal({ placeId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescripion] = useState("");
  const [cover_pic, setCoverPic] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [price, setPrice] = useState(0);

  const [errorMessage, setErrorMessage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("placeId", placeId);
    formData.append("cover_pic", cover_pic);
    setImageLoading(true);

    let response = await dispatch(thunkCreateProduct(formData, placeId));

    if (response.errors) {
      setImageLoading(false);
      setErrorMessage(response.errors);
    } else {
      setImageLoading(false);
      setErrorMessage({});
      return history.push(`/places/${response.id}`);
    }
  };

  return (
    <div id="createProductModal">
      <h2>Create a product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          //   "accept" attribute restricts the types of files that can be selected to only images
          accept="image/*"
          onChange={(e) => setCoverPic(e.target.files[0])}
        />
        <div>
          <button>Create Product</button>
        </div>
      </form>
    </div>
  );
}
