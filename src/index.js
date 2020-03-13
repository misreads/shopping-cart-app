import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "materialize-css"
import "materialize-css/dist/css/materialize.min.css"
import mainReducer from "./components/reducers/mainReducer"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store = createStore(mainReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
