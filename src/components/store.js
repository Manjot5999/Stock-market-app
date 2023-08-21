import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk"; // Import redux-thunk
import cartSlice, { fetchAndInitializeState } from "./wishlistSlice"; // Import fetchAndInitializeState

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  },
  middleware: [thunk] // Add redux-thunk middleware
});

// Dispatch the fetchAndInitializeState thunk action when the store is created
store.dispatch(fetchAndInitializeState());

export default store;
