const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];


export function formatDate(dateString: string): string {
    if (!Date.parse(dateString)) {
        return '';
    }

    const date = new Date(dateString);
    return monthNames[date.getMonth()]
        + ' ' + date.getDate()
        + dateOrdinal(date.getDate())
        + ', ' + date.getFullYear();
}

function dateOrdinal(date: number): string {
    switch (date) {
        case 1: case 21: case 31:
            return 'st';
        case 2: case 22:
            return 'nd';
        case 3: case 23:
            return 'rd';
        default:
            return 'th';
    }
}
