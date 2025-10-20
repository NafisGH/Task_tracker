import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // сюда добавляем редьюсеры
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
