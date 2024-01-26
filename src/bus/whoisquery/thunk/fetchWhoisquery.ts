// Core
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API
import { API_WHOIS_QUERY_URL } from '../../../init/constants';

// Tools
import { customFetch } from '../../../tools/utils';

// Types
import * as types from '../types';

// Action
const fetchWhoisqueryDomainAction = createAction('whoisquery/FETCH_WHOISQUERY_DOMAIN_ASYNC');

export const fetchWhoisqueryDomain = createAsyncThunk<types.Whoisquery, /* payload type => */ string>(
    fetchWhoisqueryDomainAction.type,
    async (payload) => {
        const result = await customFetch<types.Whoisquery>({
            successStatusCode: 200,
            fetch:             () => fetch(`${API_WHOIS_QUERY_URL}/whois/${payload}?live=false`, {
                method:  'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        });

        return result;
    },
);
