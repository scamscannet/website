// Core
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

// Tools
import { useDispatch } from '../../../tools/hooks';

// Thunk
import { fetchReportForDomain } from './fetchReportForDomain';

// Types
import * as types from '../types';

// Reducers
export const extraReducers = (builder: ActionReducerMapBuilder<types.ReportForDomainState>) => {
    builder /* CASES */
        .addCase(fetchReportForDomain.pending, (/* state => */state) => {
            state.isLoading = true;
        })
        .addCase(fetchReportForDomain.fulfilled, (/* state => */state) => {
            state.isLoading = false;
            state.ok = true;
            state.error = false;
        })
        .addCase(fetchReportForDomain.rejected, (/* state => */state) => {
            state.isLoading = false;
            state.error = true;
            state.ok = false;
        });
};

// Hook
export const useReportForDomainThunk = () => {
    const dispatch = useDispatch();

    return {
        fetchReportForDomain: (payload: types.ReportPayload) => void dispatch(fetchReportForDomain(payload)),
    };
};
