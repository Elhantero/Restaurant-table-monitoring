import {configureStore} from "@reduxjs/toolkit";
import tablesReducer from "../slices/tableSlices";

export const store = configureStore({
    reducer: {
        tables: tablesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
