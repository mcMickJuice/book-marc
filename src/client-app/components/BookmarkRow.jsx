import React from 'react';
import {bookmarkShapeWithReview} from '../common/bookmarkShape'
import {Link} from 'react-router'

const BookmarkRow = ({bookmark}) => {
    const {title, id, url, rating} = bookmark;

    return (
        <tr>
            <td><Link to={`/bookmark/${id}`}>{title}</Link></td>
            <td>
                <a href={url} target="_blank">{url}</a>
            </td>
            <td>
                {rating ? rating : 'No Rating'}
            </td>
        </tr>
    )
}

BookmarkRow.propTypes = {
    bookmark: bookmarkShapeWithReview
}

export default BookmarkRow