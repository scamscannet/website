// Core
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API
import { API_WHOIS_QUERY_URL } from '../../../init/constants';

// Tools
import { customFetch } from '../../../tools/utils';

// Types
import * as types from '../types';

// Action
const fetchWhoisqueryIpAction = createAction('whoisquery/FETCH_WHOISQUERY_IP_ASYNC');

export const fetchWhoisqueryIp = createAsyncThunk<types.Whoisquery, /* payload type => */ string>(
    fetchWhoisqueryIpAction.type,
    async (payload) => {
        const result = await customFetch<types.Whoisquery>({
            successStatusCode: 200,
            fetch:             () => fetch(`${API_WHOIS_QUERY_URL}/ip-whois/${payload}?max_ipnet_size=64&live=false`, {
                method:  'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        });

        return result;
    },
);
