// Core
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API
import { API_SCAM_SCAN_URL } from '../../../init/constants';

// Tools
import { customFetch } from '../../../tools/utils';

// Types
// import * as types from '../types';

// Action
const fetchScamCheckScreenshotAction = createAction('scamcheck/FETCH_SCAM_CHECK_SCREENSHOT_ASYNC');

export const fetchScreenshot = createAsyncThunk<string, /* payload type => */ string>(
    fetchScamCheckScreenshotAction.type,
    async (payload) => {
        const result = await customFetch<string>({
            successStatusCode: 200,
            fetch:             () => fetch(`${API_SCAM_SCAN_URL}/registry/image?url=${payload}`, {
                method:  'GET',
                headers: {
                    'Content-Type': 'image/jpeg',
                },
            }),
        }, 'blob');

        return result;
    },
);
