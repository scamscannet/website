import { object, string, InferType } from 'yup';

export const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
export const domainRegex = /^(www\.)?[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;

const customValidator = (value: any) => {
    if (!urlRegex.test(value) && !ipv4Regex.test(value) && !domainRegex.test(value)) {
        return false;
    }

    return true;
};

export const schema = object(
    {
        urlOrIp: string().test('custom-validation', 'Please, provide correct value', customValidator),

    },
);

export type IFormState = InferType<typeof schema>;

export const inithialState: IFormState = {
    urlOrIp: '',
};
