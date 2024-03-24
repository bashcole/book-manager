import {configureStore} from '@reduxjs/toolkit';
import UiSlice, {UiState} from "@/store/reducers/ui-slice";

const store = configureStore({
    reducer: {ui: UiSlice},
});

export interface IRootStore {
    ui: UiState
}

export default store;