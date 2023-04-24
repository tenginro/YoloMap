import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useModal } from "../../context/Modal";
import { thunkCreateProduct } from "../../store/product";
import "./CreateProductModal.css";

export default function CreateProductModal({ placeId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cover_pic, setCoverPic] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [price, setPrice] = useState(0);

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

    let response = await dispatch(thunkCreateProduct(formData, placeId));

    if (response.errors) {
      setImageLoading(false);
      setErrorMessage(response.errors);
    } else {
      setImageLoading(false);
      setErrorMessage({});
      closeModal();
      return history.push(`/places/${placeId}`);
    }
  };

  return (
    <div id="createProductModal">
      <h2>Create a product</h2>
      <form
        className="createProductForm"
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
            //   "accept" attribute restricts the types of files that can be selected to only images
            accept="image/*"
            onChange={(e) => setCoverPic(e.target.files[0])}
            // to allow multiple files upload, need to change to e.target.files above
            // multiple
            required
          />
        </label>

        <div className="buttonContainer">
          <button>Create Product</button>
        </div>
      </form>
    </div>
  );
}
