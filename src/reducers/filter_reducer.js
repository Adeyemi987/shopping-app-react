import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price)
      maxPrice = Math.max(...maxPrice)
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      }
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      }
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      }
    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      }
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state
      let tempProducts = [...filtered_products]
      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price)
      }
      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price)
      }
      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
      return {
        ...state,
        filtered_products: tempProducts,
      }
    case UPDATE_FILTERS:
      const { name, value } = action.payload
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      }
    case FILTER_PRODUCTS:
      const {all_products} = state;
      const {text, category, company, color, price, shipping} = state.filters;
      let tempProductss = [...all_products]
      if(text){
        tempProductss = tempProductss.filter((product) => {
          return product.name.toLowerCase().startsWith(text)
        })
      }

      if (category !== 'all') {
        tempProductss = tempProductss.filter((product) => {
          return product.category === category
        })
      }

      if (company !== 'all') {
        tempProductss = tempProductss.filter((product) => {
          return product.company === company
        })
      }

      if (color !== 'all') {
        tempProductss = tempProductss.filter((product) => {
          return product.colors.find((c) => c === color)
        })
      }
      //price filter
        tempProductss = tempProductss.filter((product) => {
          return product.price <= price
        })
      
      if (shipping) {
        tempProductss = tempProductss.filter((product) => {
          return product.shipping === shipping;
        })
      }


      return { ...state, filtered_products: tempProductss }
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
            text: '',
            company: 'all',
            category: 'all',
            color: 'all',
            price: state.filters.max_price,
            shipping: false,
          },
      }
    default:
      break
  }
  return state
 
}

export default filter_reducer
