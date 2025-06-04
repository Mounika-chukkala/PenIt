// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import { ParallaxProvider } from 'react-scroll-parallax';
import { Toaster } from "react-hot-toast";
// import {BrowserRouter} from "react-router-dom"
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./utils/store.js";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
<ParallaxProvider>

  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
</ParallaxProvider>
  </Provider>
);
