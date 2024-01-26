import { object, string, InferType } from 'yup';

const pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

export const schema = object(
    {
        url: string()
            .matches(pattern, 'Please, provide correct URL!'),
    },
);

export type IFormState = InferType<typeof schema>;

export const inithialState: IFormState = {
    url: '',

};
