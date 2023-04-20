const LOAD_PLACE_PRODUCTS = "products/load_place_all";

export const actionLoadPlaceAllProducts = (products) => ({
  type: LOAD_PLACE_PRODUCTS,
  products,
});

export const thunkGetAllProductsForPlace = (placeId) => async (dispatch) => {
  const response = await fetch("/api/products/");
  if (response.ok) {
    const allProducts = await response.json();
    const allProductsForPlace = allProducts.filter(
      (el) => el.placeId === placeId
    );
    await dispatch(actionLoadPlaceAllProducts(allProductsForPlace));
    return allProductsForPlace;
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
    default:
      return state;
  }
};
export default productReducer;
