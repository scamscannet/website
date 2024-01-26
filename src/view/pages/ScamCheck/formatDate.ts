export const formatDate = (dateString: string) => {
    if (!dateString) {
        return 'No data';
    }

    const dateParts = dateString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\+(\d{4})/);

    if (!dateParts) {
        return 'No data';
    }

    const monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December',
    ];

    const year = parseInt(dateParts[ 1 ], 10);
    const monthNumber = parseInt(dateParts[ 2 ], 10) - 1;
    const month = monthNames[ monthNumber ];
    const day = parseInt(dateParts[ 3 ], 10);
    const hour = parseInt(dateParts[ 4 ], 10);
    const minute = parseInt(dateParts[ 5 ], 10);
    // const second = parseInt(dateParts[ 6 ], 10);


    const formattedDate = `${month} ${day}, ${year} - ${hour}:${minute}`;

    return formattedDate;
};
