//@flow

const monthMap = {
    '0': 'January',
    '1': 'February',
    '2': 'March',
    '3': 'April',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'August',
    '8': 'September',
    '9': 'October',
    '10': 'November',
    '11': 'December',
}

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export const getDateDiffByDays = (timeInMs: number, numOfDays: number) => {
    const diffInMs = numOfDays * ONE_DAY_IN_MS;
    return timeInMs + diffInMs
}

export const getDateString = (timeInMs: number) => {
    const date = new Date(timeInMs);

    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    return `${monthMap[month]} ${day}, ${year}`
}