import { useOverflowHidden } from '@/tools/hooks';
import { Footer, Header, Modal } from '@/view/components';
import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

type IContext = {
    isModalActive: boolean,
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalLandingContext = createContext<IContext | null>(null);

export const LandingPageLayout = () => {
    const [ isModalActive, setModalActive ] = useState(false);
    const overflowHandler = useOverflowHidden();

    return (
        <ModalLandingContext.Provider value = {{ isModalActive, setModalActive }}>
            <div style = {{ position: 'relative' }}>
                <Header
                    isModalActive = { isModalActive }
                    setModalActive = { setModalActive }
                />
                <Outlet />
                <Footer />
                {isModalActive && (
                    <Modal
                        onClose = { () => {
                            overflowHandler(isModalActive);
                            setModalActive(false);
                        } }>
                    </Modal>
                )}
            </div>
        </ModalLandingContext.Provider>
    );
};
