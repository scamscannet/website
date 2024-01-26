// Core
import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import * as Pages from '../pages';

// Tools
import * as book from './book';
import { LandingPageLayout } from '@/layouts';

export const Private: FC = () => {
    return (
        <Routes>
            <Route element = { <LandingPageLayout /> }>
                <Route
                    element = { <Pages.Root /> }
                    path = { book.ROOT }
                />
                <Route
                    element = { <Pages.Blog /> }
                    path = { `${book.BLOG}/:id?` }
                />
            </Route>
            <Route
                element = { <Pages.ScamCheck /> }
                path = { book.SCAM_CHECK }
            />
            <Route
                element = { <Pages.WhoisQuery /> }
                path = { book.WHOIS_QUERY }
            />
            <Route
                element = { <Pages.DomainZone /> }
                path = { book.DOMAIN_ZONE }
            />
            <Route
                element = { <Pages.AboutUs /> }
                path = { book.ABOUT_US }
            />
            {/* MarkerGen route */}
            <Route
                element = {
                    <Navigate
                        replace
                        to = { book.ROOT }
                    />
                }
                path = '*'
            />
        </Routes>
    );
};
