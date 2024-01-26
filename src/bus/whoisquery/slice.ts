// Core
import { createSlice } from '@reduxjs/toolkit';

// Types
import * as types from './types';

// Reducers
import * as reducers from './reducers';
// MarkerGen import extraReducers
import { extraReducers } from './thunk';

const initialState = {
    isLoading:  false,
    whoisQuery: null,
    error:      null,
};

export const whoisquerySlice = createSlice<types.WhoisqueryState, typeof reducers>({
    name: 'whoisquery',
    initialState,
    reducers,
    // MarkerGen use extraReducers
    extraReducers,
});

export const sliceName = whoisquerySlice.name;
export const whoisqueryActions = whoisquerySlice.actions;
export default whoisquerySlice.reducer;
