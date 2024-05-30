import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./authSlice";
import { employeeReducer } from "./employeeSlice";

// configure which keuy we want to persist
const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["authState"],
};
const employeePersistConfig = {
  key: "employee",
  storage: storage,
  whitelist: ["employeesState"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  employee: persistReducer(employeePersistConfig, employeeReducer),

});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});