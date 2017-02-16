
const monthMap = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
}

const calcYear = year => {
    return 1900 + year
}

export const getDateString = (timeInMs) => {
    const date = new Date(timeInMs);

    const month = date.getMonth();
    const day = date.getDate();
    const year = calcYear(date.getYear());

    return `${monthMap[month]} ${day}, ${year}`
}