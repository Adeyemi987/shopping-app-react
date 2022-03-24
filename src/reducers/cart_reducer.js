import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload
      const tempItem = state.cart.find((i) => i.id === id + color)
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max
            }
            return { ...cartItem, amount: newAmount }
          } else {
            return cartItem
          }
        })

        return { ...state, cart: tempCart }
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        }
        return { ...state, cart: [...state.cart, newItem] }
      }

    case REMOVE_CART_ITEM:
      const tempCart = state.cart.filter((item) => item.id !== action.payload)
      return { ...state, cart: tempCart }

    case CLEAR_CART:
      return { ...state, cart: [] }
    case TOGGLE_CART_ITEM_AMOUNT:
      const { iD, value } = action.payload
      const tempCartt = state.cart.map((item) => {
        if (item.id === iD) {
          if (value === 'inc') {
            let newAmount = item.amount + 1
            if (newAmount > item.max) {
              newAmount = item.max
            }
            return { ...item, amount: newAmount }
          }
          if (value === 'dec') {
            let newAmount = item.amount - 1
            if (newAmount < 1) {
              newAmount = 1
            }
            return { ...item, amount: newAmount }
          }
        } 
          return item
        
      })
      return { ...state, cart: tempCartt }
    case COUNT_CART_TOTALS:
      const {total_items, total_amount} = state.cart.reduce(
        (total, cartItem) => {
        const {price, amount} = cartItem;
        total.total_items += amount;
        total.total_amount += (amount * price)
        return total
      }, {
        total_items: 0,
        total_amount: 0,
      })
      return { ...state, total_items, total_amount }

    default:
      break
  }
  return state
}

export default cart_reducer
