// Core
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API
import { API_SCAM_SCAN_URL } from '../../../init/constants';

// Tools
import { customFetch } from '../../../tools/utils';

// Types
import * as types from '../types';

// Action
const fetchScamCheckAction = createAction('scamcheck/FETCH_SCAM_CHECK_ASYNC');

export const fetchScamCheck = createAsyncThunk<types.ScamCheck, /* payload type => */ string>(
    fetchScamCheckAction.type,
    async (payload) => {
        const result = await customFetch<types.ScamCheck>({
            successStatusCode: 200,
            fetch:             () => fetch(`${API_SCAM_SCAN_URL}/registry?url=${payload}`, {
                method:  'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        });

        return result;
    },
);
