export const ADD_TO_CART = "ADD_TO_CART"
export const ADD_QUANTITY_CART = "ADD_QUANTITY_CART"
export const SUB_QUANTITY_CART = "SUB_QUANTITY_CART"
export const REMOVE_ITEM_CART = "REMOVE_ITEM_CART"
export const CLEAR_CART = "CLEAR_CART"

export const addToCart = (head, tail, price) => {
  return {
    type: ADD_TO_CART,
    payload: { head, tail, price }
  }
}

export const addQuantityToCart = (head, tail) => {
  return {
    type: ADD_QUANTITY_CART,
    payload: { head, tail }
  }
}

export const subQuantityToCart = (head, tail) => {
  return {
    type: SUB_QUANTITY_CART,
    payload: { head, tail }
  }
}

export const removeFromCart = (head, tail) => {
  return {
    type: REMOVE_ITEM_CART,
    payload: { head, tail }
  }
}

export const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}
