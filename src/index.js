/* eslint-disable no-extend-native */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./state/store";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
// import './modules/userRoles'

Object.prototype.isArtist = function () {
  if (this.hasOwnProperty("roles")) {
    return this.roles.includes("artist");
  } else {
    return false;
  }
};


if (window.Cypress) {
  window.store = store;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  // </React.StrictMode>
);
