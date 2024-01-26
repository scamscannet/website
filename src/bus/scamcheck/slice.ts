// Core
import { createSlice } from '@reduxjs/toolkit';

// Types
import * as types from './types';

// Reducers
import * as reducers from './reducers';
// MarkerGen import extraReducers
import { extraReducers } from './thunk';

export const initialState = {
    isLoading: false,
    scamCheck: {
        domain:      null,
        lastUpdate:  null,
        name:        null,
        status:      null,
        screenshots: {
            screenshot: {
                isLoading:  false,
                screenshot: null,
                error:      null,
            },
            screenshot_fullsize: {
                isLoading:  false,
                screenshot: null,
                error:      null,
            },
        },
        websiteText: null,
        Domain:      {
            registrar:        null,
            registrationDate: null,
            ownerName:        null,
        },
        Ip: {
            ip:         null,
            country:    null,
            registrant: null,
        },
    },
    chart: {
        domain: {
            isLoading: false,
            error:     false,
            data:      null,
        },
        website: {
            isLoading: false,
            error:     false,
            data:      null,
        },
    },
    error: null,
};

export const scamcheckSlice = createSlice<types.ScamCheckState, typeof reducers>({
    name: 'scamcheck',
    initialState,
    reducers,
    // MarkerGen use extraReducers
    extraReducers,
});

export const sliceName = scamcheckSlice.name;
export const whoisqueryActions = scamcheckSlice.actions;
export default scamcheckSlice.reducer;
