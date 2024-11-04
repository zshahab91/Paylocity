import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productReducer } from "./productSlice";

// configure which keuy we want to persist
const productPersistConfig = {
  key: "product",
  storage: storage,
  whitelist: ["productsState"],
};

const rootReducer = combineReducers({
  product: persistReducer(productPersistConfig, productReducer),

});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: (arg0: { serializableCheck: boolean; }) => any) =>
    getDefaultMiddleware({ serializableCheck: false }),
});