import { object, string, boolean, InferType } from 'yup';

const pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

export const schema = object(
    {
        email: string()
            .matches(/^(?!\s*$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email')
            .nullable(),
        url: string()
            .required()
            .matches(pattern, 'Please, provide correct URL!'),
        description: string().min(6)
            .required('Description shouldn\'t be less than 6 symbols'),
        recieveUpdates: boolean().default(false),
        checkbox:       boolean().default(false),
    },
);

export type IFormState = InferType<typeof schema>;

export const inithialState: IFormState = {
    url:            '',
    description:    '',
    recieveUpdates: true,
    email:          '',
    checkbox:       true,
};
