import { createSlice } from "@reduxjs/toolkit";
import { db } from "../Firebase/Firebase-app";
import { getDocs,collection, doc,updateDoc,addDoc } from 'firebase/firestore';

const cartSlice = createSlice({
  name: 'watchlist',
  initialState: {
    items: [], // Default empty initial state
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      
    },
    updateItem: (state, action) => {
      const { id, updatedWishlist } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
    
      if (itemToUpdate) {
        itemToUpdate.Wishlist = updatedWishlist;
      }
    },
    
    clearCart: (state) => {

      state.items = [];
    },
    removeItem: (state, action) => {
      state.items.pop();
    },
    initializeState: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, clearCart, removeItem, updateItem, initializeState } = cartSlice.actions;

// Create the thunk action that fetches user data and initializes the state
export const fetchAndInitializeState = () => async (dispatch) => {
  try {
    const userCollection=collection(db,'UserId')
    const data = await getDocs(userCollection);
    const userData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    console.log(userData)
    dispatch(initializeState(userData));
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const addItemAsync = (item) => async (dispatch) => {
  try {
    const WatchList = collection(db, "UserId");
    const res=await addDoc(WatchList, item);
    dispatch(addItem(res));
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const updateItemasync = (id,item) => async (dispatch) => {
  try {
    const WatchList = doc(db, "UserId",id);
    await updateDoc(WatchList, item);
    dispatch(updateItem({ id, updatedWishlist: item.Wishlist }));
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export default cartSlice; // Export the cartSlice reducer
