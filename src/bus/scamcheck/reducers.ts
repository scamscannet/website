// Types
import { initialState } from './slice';
import * as types from './types';

export const setScamcheckToInitial: types.BaseContact<undefined> = (/* state, action */ state) => {
    state.chart = initialState.chart;
    state.error = initialState.error;
    state.isLoading = initialState.isLoading;
    state.scamCheck = initialState.scamCheck;
};
