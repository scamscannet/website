// Core
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API
import { API_SCAM_SCAN_URL } from '../../../init/constants';

// Tools
import { customFetch } from '../../../tools/utils';

// Types
import * as types from '../types';

// Action
const fetchWebsiteChartInfoAction = createAction('scamcheck/FETCH_WEBSITE_CHART_INFO_ASYNC');

export const fetchWebsiteChartInfo = createAsyncThunk<types.ChartInfo, /* payload type => */ string>(
    fetchWebsiteChartInfoAction.type,
    async (payload) => {
        const result = await customFetch<types.ChartInfo>({
            successStatusCode: 201,
            fetch:             () => fetch(`${API_SCAM_SCAN_URL}/ai/classify/website?url=${payload}`, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        });

        return result;
    },
);
