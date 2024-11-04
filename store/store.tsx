import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { productReducer } from "./productSlice";

export const store = configureStore({
  reducer: { 
    product: productReducer
  },
  middleware: (getDefaultMiddleware: (arg0: { serializableCheck: boolean; }) => any) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;