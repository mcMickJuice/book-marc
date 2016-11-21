import React, {PropTypes as T} from 'react'

const URL_PREFIX = '//';
const HTTP_PATTERN = '^http';

const normalizeUrl = url => {
    if(url.match(HTTP_PATTERN) == null) {
        return `${URL_PREFIX}${url}`
    }

    return url;
}

const BookmarkUrlLink = ({url}) => {
    const normalizedUrl = normalizeUrl(url);

    return <a href={normalizedUrl} target="_blank">Open Bookmarked Page</a>
}

BookmarkUrlLink.propTypes = {
    url: T.string.isRequired
}

export default BookmarkUrlLink