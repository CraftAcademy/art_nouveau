/* eslint-disable no-extend-native */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./state/store";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";

if (window.Cypress) {
  window.store = store;
}

axios.defaults.baseURL = 'http://localhost:3001' 

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
