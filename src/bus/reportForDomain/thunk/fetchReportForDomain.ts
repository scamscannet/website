// Core
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API
import { API_SCAM_SCAN_URL } from '../../../init/constants';

// Tools
import { customFetch } from '../../../tools/utils';

// Types
import * as types from '../types';

// Action
const fetchReportForDomainAction = createAction('reportForDomain/FETCH_REPORT_FOR_DOMAIN_ASYNC');

export const fetchReportForDomain = createAsyncThunk<types.ReportForDomain, /* payload type => */ types.ReportPayload>(
    fetchReportForDomainAction.type,
    async (payload) => {
        console.log('fetchReportForDomain payload', payload); /* Demonstration */

        const result = await customFetch<types.ReportForDomain>({
            successStatusCode: 201,
            fetch:             () => fetch(`${API_SCAM_SCAN_URL}/report`, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }),
        });

        return result;
    },
);
