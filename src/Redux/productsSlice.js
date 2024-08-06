import { createSlice, current } from "@reduxjs/toolkit";
import { products } from "../assets/json";

const initialState = {
  countProducts: [],
  productData: [],
  cartItem: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.productData = products.map((item) => ({ ...item, quantity: 1 }));
    },
    setCountProducts: (state, action) => {
      const item = action.payload;
      const existingItem = state.countProducts.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.countProducts.push(item);
      }
    },

    addItem: (state, action) => {
      console.log("🚀 ~ action:", action.payload);
      console.log("🚀 ~ action:", current(state.cartItem));
      const index = state.cartItem?.findIndex(
        (item) => item?.id === action.payload?.id
      );
      console.log("🚀 ~ index:", index);

      if (index !== -1) {
        state.cartItem[index].quantity += 1;
      } else {
        state.cartItem.push(action.payload); // Adding item
      }
    },
    removeItem: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload
      );
    },
    // increaseQuantity: (state, action) => {
    //   const item = state.countProducts.find((i) => i.id === action.payload);
    //   if (item) {
    //     item.quantity += 1;
    //   }
    // },
    // decreaseQuantity: (state, action) => {
    //   const item = state.countProducts.find((i) => i.id === action.payload);
    //   if (item && item.quantity > 1) {
    //     item.quantity -= 1;
    //   }
    // },
  },
});

export const {
  setCountProducts,
  getAllProducts,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  addItem,
} = productsSlice.actions;
export default productsSlice.reducer;
