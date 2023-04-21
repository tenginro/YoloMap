import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useModal } from "../../context/Modal";
import { thunkDelateProduct } from "../../store/product";
import "./DeleteProductModal.css";

export default function DeleteProductModal({ product }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const onClick = async (e) => {
    e.preventDefault();
    await dispatch(thunkDelateProduct(product))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(Object.values(data.errors));
        }
      });
    return history.push("/current");
  };

  return (
    <div className="deleteProductModal">
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to remove this product from the listings?</h3>
      <div className="deleteProductModalButton">
        <button className="yesButton" type="button" onClick={onClick}>
          Yes (Delete product)
        </button>
        <button className="noButton" type="button" onClick={closeModal}>
          No (Keep product){" "}
        </button>
      </div>
    </div>
  );
}
