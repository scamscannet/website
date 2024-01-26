import { useLayoutEffect, useRef, useState } from 'react';


export const useComponentWidth = () => {
    const [ width, setWidth ] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);

    let timerId = 0;

    useLayoutEffect(() => {
        if (!ref.current) {
            return;
        }
        const { width: styleWidth, marginRight } = window.getComputedStyle(ref.current);
        setWidth(parseInt(styleWidth, 10) + parseInt(marginRight, 10));
    }, [ width ]);

    const delayedFunc = () => {
        if (!ref.current) {
            return;
        }
        const { width: styleWidth, marginRight } = window.getComputedStyle(ref.current);
        setWidth(parseInt(styleWidth, 10) + parseInt(marginRight, 10));
    };

    const handleResize = () => {
        clearTimeout(timerId);
        timerId = window.setTimeout(delayedFunc, 500);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return {
        ref,
        width,
    };
};
