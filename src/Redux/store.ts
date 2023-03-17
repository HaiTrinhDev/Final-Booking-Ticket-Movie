import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./saga/rootSaga";
import BannerReducer from "./reducer/BannerReducer";
import BannerReducerSaga from "./reducer/BannerSagaReducer";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    Banner: BannerReducer,
    BannerSaga: BannerReducerSaga,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;