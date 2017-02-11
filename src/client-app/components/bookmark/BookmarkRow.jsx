import React from 'react';
import {bookmarkShapeWithReview} from '../../common/bookmarkShape'
import {Link} from 'react-router'
import BookmarkUrlLink from './BookmarkUrlLink'

const BookmarkRow = ({bookmark}) => {
    const {title, id, url, rating} = bookmark;

    return (
        <tr>
            <td><Link to={`/bookmark/${id}`}>{title}</Link></td>
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