
// Tools
import { ControlledError } from './controlledError';

// Types
import { FetchOptions } from './makeRequest';

export const customFetch = async <SuccessData, ErrorData = {}>(fetchOptions: FetchOptions, handle: 'blob' | 'json' = 'json') => {
    const response = await fetchOptions.fetch();

    if (fetchOptions.successStatusCode && (response.status !== fetchOptions.successStatusCode)) {
        let errorData: ErrorData | null = null;

        try {
            errorData = handle === 'blob' ? await response.blob() : await response.json();
        } catch {
            throw new ControlledError({ message: 'Parsing error' });
        }

        throw new ControlledError({
            message:    'Parsed error',
            statusCode: response.status,
            data:       errorData,
        });
    }

    const successData: SuccessData = handle === 'blob' ? URL.createObjectURL(await response.blob()) : await response.json();

    return successData;
};
