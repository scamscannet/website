// Core
import React, { Component, FC } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Images
import { Button, SectionTitle } from '@/view/elements';
import { WarningIcon } from '@/assets/images/icons';

// Styles
const ErrorBoundryContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 48px;
`;

const ErrorBoundryWrapper = styled.section`
    height: calc(100vh - 263px);
`;


// Types
type State =  {
    error: Error | null;
}

type PropChildren ={
    children: React.ReactNode;
}

type PropTypes = {
    navigation: NavigateFunction
} & PropChildren;
class ErrorBoundaryClass extends Component<PropTypes, State> {
    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    state: State = {
        error: null,
    };

    componentDidMount(): void {
        const body = document.querySelector('body');
        if (body) {
            body.style.overflow = 'unset';
        }
    }

    render() {
        const { error } = this.state;
        const { children, navigation } = this.props;

        return error ? (
            <ErrorBoundryWrapper>
                <ErrorBoundryContent>
                    <WarningIcon
                        height = { 132 }
                        width = { 132 }
                    />
                    <SectionTitle>Oops, something went wrong ...</SectionTitle>
                    <div style = {{ margin: '0 auto' }}>
                        <Button onClick = { () => navigation(-1) }>Go Back</Button>
                    </div>
                </ErrorBoundryContent>
            </ErrorBoundryWrapper>
        ) : children;
    }
}

export const ErrorBoundary: FC<PropChildren> = ({ children }) => {
    const navigation = useNavigate();

    return (
        <ErrorBoundaryClass
            children = { children }
            navigation = { navigation }
        />
    );
};
