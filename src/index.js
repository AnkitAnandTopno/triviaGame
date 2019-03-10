import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import App from "./App";
import { createStore } from "redux";
import registerServiceWorker from "./registerServiceWorker";
import allReducers from "./modules";

require("react-js-vector-icons/fonts");

const store = createStore(allReducers);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
