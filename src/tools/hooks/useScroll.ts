import { useEffect, useState } from 'react';

export const useScroll = () => {
    const [ isScrolled, setIsScrolled ] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check, if pageYOffset doesn't equal 0
            const scrolled = window.scrollY !== 0;
            setIsScrolled(scrolled);
        };

        // handler when component mounted
        window.addEventListener('scroll', handleScroll);

        // remove handler when unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return isScrolled;
};
