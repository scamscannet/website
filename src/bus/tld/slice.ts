// Core
import { createSlice } from '@reduxjs/toolkit';

// Types
import * as types from './types';

// Reducers
import * as reducers from './reducers';
// MarkerGen import extraReducers
import { extraReducers } from './thunk';

const initialState = {
    isLoading: false,
    data:      null,
    error:     null,
};

export const tldSlice = createSlice<types.TldState, typeof reducers>({
    name: 'tld',
    initialState,
    reducers,
    // MarkerGen use extraReducers
    extraReducers,
});

export const sliceName = tldSlice.name;
export const tldActions = tldSlice.actions;
export default tldSlice.reducer;
