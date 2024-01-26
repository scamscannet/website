// Core
import { createSlice } from '@reduxjs/toolkit';

// Types
import * as types from './types';

// Reducers
import * as reducers from './reducers';

// MarkerGen import extraReducers
import { extraReducers } from './thunk';

const initialState = {
    error:     false,
    isLoading: false,
    ok:        false,
};

export const reportForDomainSlice = createSlice<types.ReportForDomainState, typeof reducers>({
    name: 'reportForDomain',
    initialState,
    reducers,
    // MarkerGen use extraReducers
    extraReducers,
});

export const sliceName = reportForDomainSlice.name;
export const reportForDomainActions = reportForDomainSlice.actions;
export default reportForDomainSlice.reducer;
