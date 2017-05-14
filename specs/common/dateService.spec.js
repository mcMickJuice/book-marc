const {getDateString, getDateDiffByDays} = require('common/dateService')

const feb182017InMs = 1487437395222

test('DateService.getDateString gets month from ms', () => {
    expect.assertions(1)

    const result = getDateString(feb182017InMs);

    expect(result.startsWith('February')).toBeTruthy()
})

test('DateService.getDateString gets day from ms', () => {
    expect.assertions(1)

    const result = getDateString(feb182017InMs);

    expect(result.indexOf('18') > -1).toBeTruthy()
})

test('DateService.getDateString gets year from ms', () => {
    expect.assertions(1)

    const result = getDateString(feb182017InMs);

    expect(result.endsWith('2017')).toBeTruthy()
})

test('DateService.getDateDiffByDays gets date from x days ago', () => {
    expect.assertions(2)

    const daysIntoPast = -6
    const result = getDateDiffByDays(feb182017InMs, daysIntoPast)

    expect(result < feb182017InMs).toBeTruthy()
    
    const dateString = getDateString(result);
    expect(dateString.indexOf('12') > -1).toBeTruthy()
})

test('DateService.getDateDiffByDays gets date x days from now', () => {
    expect.assertions(2)

    const daysIntoPast = 3
    const result = getDateDiffByDays(feb182017InMs, daysIntoPast)

    expect(result > feb182017InMs).toBeTruthy()
    
    const dateString = getDateString(result);
    expect(dateString.indexOf('21') > -1).toBeTruthy()
})