const test = require('tape')
const {getDateString} = require('../../src/client-app/common/dateService')

const feb182017InMs = 1487437395222

test('DateService gets month from ms', t => {
    t.plan(1)

    var result = getDateString(feb182017InMs);

    t.assert(result.startsWith('February'), 'Datestring starts with February')
})

test('DateService gets day from ms', t => {
    t.plan(1)

    var result = getDateString(feb182017InMs);

    t.assert(result.indexOf('18') > -1, 'Datestring contains 18 as day')
})

test('DateService gets year from ms', t => {
    t.plan(1)

    var result = getDateString(feb182017InMs);

    t.assert(result.endsWith('2017'), 'Datestring ends with year 2017')
})

test('DataService test should fail', t => {
    t.plan(1)

    t.equal(false, true, 'this should fail')
})