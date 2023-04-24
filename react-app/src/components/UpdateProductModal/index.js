import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useModal } from "../../context/Modal";
import { thunkUpdateProduct } from "../../store/product";
import "./UpdateProductModal.css";

export default function UpdateProductModal({ product, placeId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  const [errorMessage, setErrorMessage] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", Math.round(price));
    formData.append("placeId", placeId);

    let response = await dispatch(thunkUpdateProduct(formData, product.id));
    if (response.errors) {
      setErrorMessage(response.errors);
    } else {
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
        // when the form includes file uploads
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

        <div className="buttonContainer">
          <button>Update Product</button>
        </div>
      </form>
    </div>
  );
}
