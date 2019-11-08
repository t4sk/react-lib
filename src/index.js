import React from "react"
import ReactDOM from "react-dom"
import "semantic-ui-css/semantic.min.css"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter as Router, Route } from "react-router-dom"

// redux
import { applyMiddleware, createStore } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import { reducer } from "./reducer"

let middlewares = [thunk]
if (process.env.NODE_ENV !== "production") {
  middlewares.push(logger)
}

const store = createStore(reducer, applyMiddleware(...middlewares))

function ScrollToTop() {
  window.scrollTo(0, 0)
  return null
}

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <Route component={ScrollToTop}>
      <Provider store={store}>
        <App />
      </Provider>
    </Route>
  </Router>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
