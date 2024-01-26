// Core
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API
import { API_SCAM_SCAN_URL } from '../../../init/constants';

// Tools
import { customFetch } from '../../../tools/utils';

// Types
// import * as types from '../types';

// Action
const fetchStatusAction = createAction('scamcheck/FETCH_STATUS_ASYNC');

type SuccesfulResponse = {status: 'allowlist' | 'blocklist' | 'watchlist' | 'scamscanlist' | 'trusted'}

export const fetchStatus = createAsyncThunk<SuccesfulResponse, /* payload type => */ string>(
    fetchStatusAction.type,
    async (payload) => {
        const result = await customFetch<SuccesfulResponse>({
            successStatusCode: 200,
            fetch:             () => fetch(`${API_SCAM_SCAN_URL}/lists?url=${payload}`, {
                method:  'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        });

        return result;
    },
);
