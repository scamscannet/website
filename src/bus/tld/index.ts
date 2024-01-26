// Core
// import { useEffect } from 'react';

// Tools
import { useSelector } from '../../tools/hooks'; /* Typed selector */

// Slice
// import { tldActions } from './slice';

// Types
// import { Tld } from './types';

// MarkerGen middleware
import { useTldThunk } from './thunk'; /* Choose one technology, Saga or Thunk */

export const useTld = () => {
    // MarkerGen api hook
    const tldThunk = useTldThunk();  /* Thunk api hook */

    // const dispatch = useDispatch();
    const tld = useSelector((state) => state.tld);

    // useEffect(() => {
    //     // MarkerGen use api hook
    //     fetchTld();
    // }, []);

    return {
        tld,
        ...tldThunk,
        // setTld: (payload: Tld) => dispatch(tldActions.setTld(payload)),
    };
};
