import React, {PropTypes} from 'react';
import {bookmarkShapeWithReview} from '../common/bookmarkShape'
import {Link} from 'react-router'

const BookmarkRow = ({bookmark}) => {
    const {title, id, url, ranking} = bookmark;

    return (
        <tr>
            <td><Link to={`/bookmark/${id}`}>{title}</Link></td>
            <td>
                <a href={url} target="_blank">{url}</a>
            </td>
            <td>
                {ranking ? ranking : 'No Ranking'}
            </td>
        </tr>
    )
}

BookmarkRow.propTypes = {
    bookmark: bookmarkShapeWithReview
}

export default BookmarkRow