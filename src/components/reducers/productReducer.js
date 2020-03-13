import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from "./../actions/productActions"

import {
  ADD_TO_CART,
  ADD_QUANTITY_CART,
  SUB_QUANTITY_CART,
  REMOVE_ITEM_CART,
  CLEAR_CART
} from "./../actions/cartActions"

const initialState = {
  items: [],
  loading: false,
  error: null,
  addedItems: [],
  total: 0,
  loadApi: true
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.products,
        loadApi: false
      }

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      }

    case ADD_TO_CART:
      console.log(
        action.payload.head,
        action.payload.tail,
        action.payload.price
      )

      let addedItem = state.items.find(
        item =>
          item.head === action.payload.head && item.tail === action.payload.tail
      )
      console.log(addedItem)
      let existed_item = state.addedItems.find(
        item =>
          item.head === action.payload.head && item.tail === action.payload.tail
      )
      if (existed_item) {
        addedItem.quantity += 1
        return {
          ...state,
          total: state.total + addedItem.price
        }
      } else {
        addedItem.quantity = 1
        addedItem.price = action.payload.price
        let newTotal = state.total + addedItem.price

        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: newTotal
        }
      }

    case ADD_QUANTITY_CART:
      let addedItemQuantity = state.items.find(
        item =>
          item.head === action.payload.head && item.tail === action.payload.tail
      )
      addedItemQuantity.quantity += 1
      let newTotal = state.total + addedItemQuantity.price
      return {
        ...state,
        total: newTotal
      }

    case SUB_QUANTITY_CART:
      let subItemQuantity = state.items.find(
        item =>
          item.head === action.payload.head && item.tail === action.payload.tail
      )
      if (subItemQuantity.quantity === 1) {
        let new_items = state.addedItems.filter(
          item =>
            item.head !== action.payload.head ||
            item.tail !== action.payload.tail
        )
        console.log(new_items)
        let newTotal = state.total - subItemQuantity.price
        return {
          ...state,
          addedItems: new_items,
          total: newTotal
        }
      } else {
        subItemQuantity.quantity -= 1
        let newTotal = state.total - subItemQuantity.price
        return {
          ...state,
          total: newTotal
        }
      }

    case REMOVE_ITEM_CART:
      let itemToRemove = state.addedItems.find(
        item =>
          item.head === action.payload.head && item.tail === action.payload.tail
      )
      let new_items = state.addedItems.filter(
        item =>
          item.head !== action.payload.head || item.tail !== action.payload.tail
      )
      console.log(new_items)

      let _newTotal = state.total - itemToRemove.price * itemToRemove.quantity
      console.log(itemToRemove)
      return {
        ...state,
        addedItems: new_items,
        total: _newTotal
      }

    case CLEAR_CART:
      return {
        ...state,
        addedItems: [],
        total: 0
      }

    default:
      // ALWAYS have a default case in a reducer
      return state
  }
}
