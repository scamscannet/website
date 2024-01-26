// Types
import * as types from './types';

export const setWhoisquery: types.BaseContact<types.Whoisquery> = (/* state => */state, action) => {
    state.whoisQuery = action.payload;
};
