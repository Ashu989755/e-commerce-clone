


import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; 
import { persistStore, persistReducer } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

import rootReducer from "./reducers";

const persistConfig = {
  key: "user",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "my-super-secret-key",
      onError(error) {
        console.log("Encryption Error:", error);
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default function createStore() {
export  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
 export const persister = persistStore(store);
  // return { store, persister };
// }
