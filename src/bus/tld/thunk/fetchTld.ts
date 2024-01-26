// Core
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API
import { API_SCAM_SCAN_URL } from '../../../init/constants';

// Tools
import { customFetch } from '../../../tools/utils';

// Types
import * as types from '../types';

// Action
const fetchTldAction = createAction('tld/FETCH_TLD_ASYNC');

export const fetchTld = createAsyncThunk<types.Tld,  {page: number, per_page: number, q?: string} |undefined>(
    fetchTldAction.type,
    async (payload = { page: 1, per_page: 10, q: '' }) => {
        const result = await customFetch<types.Tld>({
            successStatusCode: 200,
            fetch:             () => fetch(`${API_SCAM_SCAN_URL}/kdb/tlds/list?page=${payload.page}&per_page=${payload?.per_page}&q=${payload.q ? payload.q : ''}`, {
                method:  'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        });

        return result;
    },
);
