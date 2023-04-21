const LOAD_PLACE_PRODUCTS = "products/load_place_all";
const LOAD_USER_PRODUCTS = "products/load_user_all";
const CLEAR_PRODUCTS = "products/clear_place_all";
const CREATE_PRODUCT = "products/create";
const UPDATE_PRODUCT = "products/update";
const DELETE_PRODUCT = "products/delete";

export const actionLoadPlaceAllProducts = (products) => ({
  type: LOAD_PLACE_PRODUCTS,
  products,
});

export const actionLoadUserProducts = (products) => ({
  type: LOAD_USER_PRODUCTS,
  products,
});

export const actionClearProducts = () => ({
  type: CLEAR_PRODUCTS,
});

export const actionCreateProduct = (product) => ({
  type: CREATE_PRODUCT,
  product,
});

export const actionUpdateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

export const actionDeleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  id,
});

export const thunkGetAllProductsForPlace = (placeId) => async (dispatch) => {
  const response = await fetch("/api/products/");
  if (response.ok) {
    const allProducts = await response.json();
    const allProductsForPlace = allProducts.filter(
      (el) => el.placeId === +placeId
    );
    await dispatch(actionLoadPlaceAllProducts(allProductsForPlace));
    return allProductsForPlace;
  }
  return await response.json();
};

export const thunkGetUserProducts = () => async (dispatch) => {
  const response = await fetch("/api/products/current");
  if (response.ok) {
    const products = await response.json();
    await dispatch(actionLoadUserProducts(products));
    return products;
  }
  return await response.json();
};

export const thunkCreateProduct = (product, placeId) => async (dispatch) => {
  const response = await fetch(`/api/products/new`, {
    method: "POST",
    body: product,
  });
  if (response.ok) {
    const newProduct = await response.json();
    await dispatch(actionCreateProduct(newProduct));
    return newProduct;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      const errorsArr = data.errors;
      let errorsObj = {};
      errorsArr.forEach((err) => {
        const [key, value] = err.split(": ");
        errorsObj[key] = value;
      });
      return { errors: errorsObj };
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const thunkUpdateProduct = (product, productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}/edit`, {
    method: "PATCH",
    body: product,
  });

  if (response.ok) {
    const updatedProduct = await response.json();
    await dispatch(actionCreateProduct(updatedProduct));
    return updatedProduct;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      const errorsArr = data.errors;
      let errorsObj = {};
      errorsArr.forEach((err) => {
        const [key, value] = err.split(": ");
        errorsObj[key] = value;
      });
      console.log("errorsObj", errorsObj);
      return { errors: errorsObj };
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const thunkDelateProduct = (product) => async (dispatch) => {
  const response = await fetch(`/api/products/${product.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await dispatch(actionDeleteProduct(product.id));
    return await response.json();
  }
  return await response.json();
};

const initialState = {
  allProducts: {},
  singleProduct: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PLACE_PRODUCTS:
      const all = {};
      action.products.forEach((p) => {
        all[p.id] = p;
      });
      return { ...state, allProducts: { ...all } };
    case LOAD_USER_PRODUCTS:
      const products = {};
      action.products.forEach((p) => {
        products[p.id] = p;
      });
      return { ...state, allProducts: { ...products } };
    case CREATE_PRODUCT:
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          [action.product.id]: action.product,
        },
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          [action.product.id]: action.product,
        },
      };
    case DELETE_PRODUCT:
      const newState = { ...state };
      delete newState.allProducts[action.id];
      return newState;
    case CLEAR_PRODUCTS:
      return { ...state, allProducts: {} };
    default:
      return state;
  }
};
export default productReducer;
