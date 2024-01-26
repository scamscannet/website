export const setOverflow = (isBodyActive: boolean) => {
    const body = document.querySelector('body') as HTMLElement;
    body.style.overflow = !isBodyActive ? 'hidden' : '';
};

export const useOverflowHidden = () => {
    const handler = setOverflow;

    return handler;
};
