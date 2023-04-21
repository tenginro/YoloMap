import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useModal } from "../../context/Modal";
import {
  thunkCreateProduct,
  thunkGetUserProducts,
  thunkUpdateProduct,
} from "../../store/product";
import "./UpdateProductModal.css";

export default function UpdateProductModal({ product, placeId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [cover_pic, setCoverPic] = useState(product.cover_pic);
  const [price, setPrice] = useState(product.price);
  const [imageLoading, setImageLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", Math.round(price));
    formData.append("placeId", placeId);
    formData.append("cover_pic", cover_pic);
    setImageLoading(true);

    let response = await dispatch(thunkUpdateProduct(formData, product.id));
    console.log("response back from thunk", response);
    if (response.errors) {
      setImageLoading(false);
      setErrorMessage(response.errors);
    } else {
      setImageLoading(false);
      setErrorMessage({});
      closeModal();
      return history.push(`/current`);
    }
  };

  return (
    <div id="updateProductModal">
      <h2>Update a product</h2>
      <form
        className="updateProductForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label>
          <div className="inputLabel">
            Name: *{"  "}
            {errorMessage?.name && (
              <div className="errors">{errorMessage.name}</div>
            )}
          </div>
          <input
            type="text"
            value={name}
            placeholder="name is required"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            Description: (optional){"  "}
            {errorMessage?.description && (
              <div className="errors">{errorMessage.description}</div>
            )}
          </div>
          <input
            type="text"
            value={description}
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            Price: *{"  "}
            {errorMessage?.price && (
              <div className="errors">{errorMessage.price}</div>
            )}
          </div>
          <input
            type="text"
            value={price}
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
            required
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            Cover Picture: *
            {errorMessage?.cover_pic && (
              <div className="errors">{errorMessage.cover_pic}</div>
            )}
          </div>
          <input
            id="coverPicProductInput"
            type="file"
            accept="image/*"
            onChange={(e) => setCoverPic(e.target.files[0])}
            required
          />
        </label>

        <div className="buttonContainer">
          <button>Update Product</button>
        </div>
      </form>
    </div>
  );
}
