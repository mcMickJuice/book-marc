import { auth } from './httpClient'
import { getDateDiffByDays } from './dateService'
import { createUrl, responseHandler } from './requestHelpers'

const { get } = auth;

export const getDashboardData = () => {
    const fortyFiveDaysAgo = getDateDiffByDays(Date.now(), -45);
    const url = createUrl(`dashboard?sinceDate=${fortyFiveDaysAgo}`)
    return get(url)
        .then(responseHandler);
}