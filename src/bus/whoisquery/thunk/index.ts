// Core
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

// Tools
import { useDispatch } from '../../../tools/hooks';

// Thunk
import { fetchWhoisqueryDomain } from './fetchWhoisquery';
import { fetchWhoisqueryIp } from './fetchWhoisquery_ip';

// Types
import * as types from '../types';

// Reducers
export const extraReducers = (builder: ActionReducerMapBuilder<types.WhoisqueryState>) => {
    builder /* CASES */
        .addCase(fetchWhoisqueryDomain.pending, (/* state => */state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchWhoisqueryDomain.fulfilled, (/* state => */state, action) => {
            state.whoisQuery = action.payload;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(fetchWhoisqueryDomain.rejected, (/* state => */state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        });
    builder /* IP CASES */
        .addCase(fetchWhoisqueryIp.pending, (/* state => */state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchWhoisqueryIp.fulfilled, (/* state => */state, action) => {
            state.whoisQuery = action.payload;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(fetchWhoisqueryIp.rejected, (/* state => */state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        });
};

// Hook
export const useWhoisqueryThunk = () => {
    const dispatch = useDispatch();

    return {
        fetchWhoisqueryDomain: (payload: string) => void dispatch(fetchWhoisqueryDomain(payload)),
        fetchWhoisqueryIp:     (payload: string) => void dispatch(fetchWhoisqueryIp(payload)),
    };
};
