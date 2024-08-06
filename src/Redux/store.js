import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
import productsSlice from "./productsSlice";
import cartReducer from "./cartSlice";
import productsReducer from "./productsSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    cart: cartReducer,
    auth: authReducer,
    count: productsSlice,
    products: productsReducer,
  },
});

export default store;
