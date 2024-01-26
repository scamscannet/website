// Core
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type TldData = {
    tld?: string,
    registrar?: string,
    last_update: string | Date,
    count?: number
}

// State
export type Tld = {
    tlds: TldData[],
    pagination: {
        current_page: number,
        last_page: number,
        per_page: number
    }
}
export type TldState = {
    isLoading: boolean
    data: Tld | null
    error: any
}

// Contracts
export type BaseContact<T = any> = CaseReducer<TldState, PayloadAction<T>>
