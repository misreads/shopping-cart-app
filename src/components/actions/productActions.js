export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN"
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS"
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE"

const url = "https://www.amiiboapi.com//api/amiibo/?gameseries=Super Mario"
export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin())
    return fetch(url)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        let jsonPriced = json.amiibo
        for (let i = 0; i < jsonPriced.length; i++) {
          const element = jsonPriced[i]
          let price = Math.floor(Math.random() * (95 - 10 + 1) + 10) * 10
          element.price = price
        }
        dispatch(fetchProductsSuccess(jsonPriced))
        console.log(json)
        return jsonPriced
      })
      .catch(error => dispatch(fetchProductsFailure(error)))
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
})

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
})

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
})
