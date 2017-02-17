import React, {PropTypes as T} from 'react'

const URL_PREFIX = '//';
const HTTP_PATTERN = '^http';

const normalizeUrl = url => {
    if(url.match(HTTP_PATTERN) == null) {
        return `${URL_PREFIX}${url}`
    }

    return url;
}

const BookmarkUrlLink = ({url,children}) => {
    const normalizedUrl = normalizeUrl(url);
    const linkText = children || 'Open Bookmarked Page';

    return <a href={normalizedUrl} 
    target="_blank" 
    rel="noopener noreferrer">{linkText}</a>
}

BookmarkUrlLink.propTypes = {
    url: T.string.isRequired,
    children: T.string
}

export default BookmarkUrlLink