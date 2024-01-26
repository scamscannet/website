export interface ITheme {
    name: string
    button: {
        primary: string
        secondary: string
        dark: string
        error: string
    },
    palette: {
        purple: {
            main: string
            violet: string
            dark: string
            dark2: string
        },
        gray: {
            lightGrey: string
            background: string
            info: string
        },
        black: {
            dark: string
        }
        error: string
    },
    text: {
        purple: {
            main: string
        },
        black: {
            main: string
        },
        gray: {
            main: string
            secondary: string
        }
    }
    media: (val: 'min' | 'max') => {
        xl: string;
        lg: string;
        md: string;
        sm: string;
        xs: string;
    }
}

export const breakpoints = {
    xl: 1440,
    lg: 960,
    md: 720,
    sm: 540,
    xs: 0,
};

export const defaultTheme: ITheme = {
    name:   'defaultTheme',
    button: {
        primary:   '#6023FA',
        secondary: '#fff',
        dark:      '#421BA3',
        error:     '#F04438',
    },
    palette: {
        purple: {
            main:   '#6023FA',
            violet: '#D939DE',
            dark:   '#1F0D4C ',
            dark2:  '#27115E  ',
        },
        gray: {
            lightGrey:  '#D9D9D9',
            background: '#F6F6F8',
            info:       '#818181',
        },
        black: {
            dark: '#070411',
        },
        error: '#F04438',
    },
    text: {
        purple: {
            main: '#6023FA',
        },
        black: {
            main: '#090A0B',
        },
        gray: {
            main:      '#344054',
            secondary: '#B8B8B8',
        },
    },
    media: (val: 'min' | 'max') => ({
        xl: `@media (${val}-width: ${breakpoints.xl}px)`,
        lg: `@media (${val}-width: ${breakpoints.lg}px)`,
        md: `@media (${val}-width: ${breakpoints.md}px)`,
        sm: `@media (${val}-width: ${breakpoints.sm}px)`,
        xs: `@media (${val}-width: ${breakpoints.xs}px)`,
    }),
};
