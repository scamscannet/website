// Core
// import { useEffect } from 'react';

// Tools
import { useDispatch, useSelector } from '../../tools/hooks'; /* Typed selector */

// Slice
import { whoisqueryActions } from './slice';

// Types
// import { WhoisqueryDomain } from './types';

// MarkerGen middleware
import { useScamcheckThunk } from './thunk'; /* Choose one technology, Saga or Thunk */

export const useScamCheck = () => {
    // MarkerGen api hook
    const scamcheckThunk = useScamcheckThunk();  /* Thunk api hook */

    const dispatch = useDispatch();
    const scamchek = useSelector((state) => state.scamcheck);

    // useEffect(() => {
    //     // MarkerGen use api hook
    //     fetchWhoisquery();
    // }, []);

    return {
        scamchek,
        setScamCheckToInitial: () => dispatch(whoisqueryActions.setScamcheckToInitial()),
        ...scamcheckThunk,
    };
};
