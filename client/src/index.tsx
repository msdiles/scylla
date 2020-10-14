import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import "semantic-ui-css/semantic.min.css"
import "./app.scss"
import { applyMiddleware, compose, createStore } from "redux"
import { Provider } from "react-redux"
import createSagaMiddleware from "redux-saga"
import { createRouterReducer } from "./state/reducers"
import rootSaga from "./state/sagas"
import history from "@/utils/history"
import { routerMiddleware } from "connected-react-router"

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  createRouterReducer(history),
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
)
sagaMiddleware.run(rootSaga)

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
