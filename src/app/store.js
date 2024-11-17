import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LoadingSlice from '../features/loadingSlice.js';

const reducer = combineReducers({
    loading: LoadingSlice,
});

export const store = configureStore({
    reducer,
});
