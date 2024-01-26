// Core
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API
import { API_SCAM_SCAN_URL } from '../../../init/constants';

// Tools
import { customFetch } from '../../../tools/utils';

// Types
import * as types from '../types';

// Action
const fetchDomainChartInfoAction = createAction('scamcheck/FETCH_DOMAIN_CHART_INFO_ASYNC');

export const fetchDomainChartInfo = createAsyncThunk<types.ChartInfo, /* payload type => */ string>(
    fetchDomainChartInfoAction.type,
    async (payload) => {
        const result = await customFetch<types.ChartInfo>({
            successStatusCode: 200,
            fetch:             () => fetch(`${API_SCAM_SCAN_URL}/ai/classify/domain?url=${payload}`, {
                method:  'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        });

        return result;
    },
);
