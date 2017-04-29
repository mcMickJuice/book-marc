const test = require('tape')
const {getDateString, getDateDiffByDays} = require('common/dateService')

const feb182017InMs = 1487437395222

test('DateService.getDateString gets month from ms', t => {
    t.plan(1)

    const result = getDateString(feb182017InMs);

    t.assert(result.startsWith('February'), 'Datestring starts with February')
})

test('DateService.getDateString gets day from ms', t => {
    t.plan(1)

    const result = getDateString(feb182017InMs);

    t.assert(result.indexOf('18') > -1, 'Datestring contains 18 as day')
})

test('DateService.getDateString gets year from ms', t => {
    t.plan(1)

    const result = getDateString(feb182017InMs);

    t.assert(result.endsWith('2017'), 'Datestring ends with year 2017')
})

test('DateService.getDateDiffByDays gets date from x days ago', t => {
    t.plan(2)

    const daysIntoPast = -6
    const result = getDateDiffByDays(feb182017InMs, daysIntoPast)

    t.assert(result < feb182017InMs, 'resulting date is before current date')
    
    const dateString = getDateString(result);
    t.assert(dateString.indexOf('12') > -1, 'Date is from 6 days ago')
})

test('DateService.getDateDiffByDays gets date x days from now', t => {
    t.plan(2)

    const daysIntoPast = 3
    const result = getDateDiffByDays(feb182017InMs, daysIntoPast)

    t.assert(result > feb182017InMs, 'resulting date is before current date')
    
    const dateString = getDateString(result);
    t.assert(dateString.indexOf('21') > -1, 'Date is 3 days hence')
})