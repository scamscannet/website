// Core
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

// Tools
import { useDispatch } from '../../../tools/hooks';

// Thunk
import { fetchTld } from './fetchTld';

// Types
import * as types from '../types';

// Reducers
export const extraReducers = (builder: ActionReducerMapBuilder<types.TldState>) => {
    builder /* CASES */
        .addCase(fetchTld.pending, (/* state => */state) => {
            state.isLoading = true;
        })
        .addCase(fetchTld.fulfilled, (/* state => */state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(fetchTld.rejected, (/* state => */state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        });
};

// Hook
export const useTldThunk = () => {
    const dispatch = useDispatch();

    return {
        fetchTld: (payload = { page: 1, per_page: 10, q: '' }) => void dispatch(fetchTld(payload)),
    };
};
