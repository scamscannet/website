// Core
import React, { FC, Suspense } from 'react';

// Routes
import { Public } from './Public';
import { Private } from './Private';

// Bus
import { useTogglesRedux } from '../../bus/client/toggles';
import { Spinner } from '../elements';

export const Routes: FC = () => {
    const { togglesRedux: { isLoggedIn }} = useTogglesRedux();

    return (
        <Suspense fallback = { <Spinner loading /> }>
            {
                isLoggedIn
                    ? <Private />
                    : <Public />
            }
        </Suspense>
    );
};
