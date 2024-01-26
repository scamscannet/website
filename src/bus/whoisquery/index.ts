// Core
// import { useEffect } from 'react';

// Tools
import { /*useDispatch*/ useSelector } from '../../tools/hooks'; /* Typed selector */

// Slice
// import { whoisqueryActions } from './slice';

// Types
// import { WhoisqueryDomain } from './types';

// MarkerGen middleware
import { useWhoisqueryThunk } from './thunk'; /* Choose one technology, Saga or Thunk */

export const useWhoisquery = () => {
    // MarkerGen api hook
    const whoisQueryThunk = useWhoisqueryThunk();  /* Thunk api hook */

    // const dispatch = useDispatch();
    const whoisquery = useSelector((state) => state.whoisquery);

    // useEffect(() => {
    //     // MarkerGen use api hook
    //     fetchWhoisquery();
    // }, []);

    return {
        whoisquery,
        // setWhoisquery: (payload: WhoisqueryDomain) => dispatch(whoisqueryActions.setWhoisquery(payload)),
        ...whoisQueryThunk,
    };
};
