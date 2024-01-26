// Core
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

// State
export type Whoisquery = any
export type WhoisqueryState = {
    isLoading: boolean
    whoisQuery: Whoisquery | null
    error: any
}

// Contracts
export type BaseContact<T = any> = CaseReducer<WhoisqueryState, PayloadAction<T>>
