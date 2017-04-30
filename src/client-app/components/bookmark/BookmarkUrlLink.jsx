/* @flow */
import React, { PropTypes as T } from 'react';

const URL_PREFIX = '//';
const HTTP_PATTERN = '^http';

const normalizeUrl = url => {
    if(url.match(HTTP_PATTERN) == null) {
        return `${URL_PREFIX}${url}`
    }

    return url;
}

export type Props = {
    url: string,
    children?: string,
};

const BookmarkUrlLink = (props: Props) => {
    const {url,children} = props;
    const normalizedUrl = normalizeUrl(url);
    const linkText = children || 'Open Bookmarked Page';

    return <a href={normalizedUrl} 
    target="_blank" 
    rel="noopener noreferrer">{linkText}</a>
}

export default BookmarkUrlLink