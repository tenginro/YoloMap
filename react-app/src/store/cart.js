const LOAD_USER_CART = "cart/user";
const ADD_TO_CART = "cart/add";
const REMOVE_FROM_CART = "cart/remove";
const CLEAR_CART = "cart/clear";

export const actionLoadUserCart = (cart) => ({
  type: LOAD_USER_CART,
  cart,
});

export const actionAddToCart = (item) => ({
  type: ADD_TO_CART,
  item,
});

export const actionRemoveFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id,
});

export const actionClearCart = () => ({
  type: CLEAR_CART,
});

export const thunkGetUserCart = () => async (dispatch) => {
  const response = await fetch("/api/cart/current");
  if (response.ok) {
    const cart = await response.json();
    await dispatch(actionLoadUserCart(cart));
    return cart;
  }
  return await response.json();
};

export const thunkAddToCart = (formData) => async (dispatch) => {
  const response = await fetch("/api/cart/add", {
    method: ["POST"],
    body: formData,
  });
  if (response.ok) {
    const cartItem = await response.json();
    await dispatch(actionAddToCart(cartItem));
    return cartItem;
  }
  return await response.json();
};

export const thunkDelateCart = (cartId) => async (dispatch) => {
  console.log(cartId);
  const response = await fetch(`/api/cart/${cartId}/remove`, {
    method: "DELETE",
  });
  if (response.ok) {
    await dispatch(actionRemoveFromCart(cartId));
    return await response.json();
  }
  return await response.json();
};

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_USER_CART:
      const cart = {};
      action.cart.forEach((c) => {
        cart[c.id] = c;
      });
      return { ...cart };
    case ADD_TO_CART:
      return {
        ...state,
        [action.item.id]: action.item,
      };
    case REMOVE_FROM_CART:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    case CLEAR_CART:
      return {};
    default:
      return state;
  }
};

export default cartReducer;
