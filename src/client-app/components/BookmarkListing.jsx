import React, {PropTypes as T} from 'react';
import {bookmarkShapeWithReview} from '../common/bookmarkShape'
import BookmarkRow from './BookmarkRow'

const BookmarkListing = ({bookmarks}) => {
    const bookmarkRows = bookmarks.map(b => {
        return <BookmarkRow key={b.id} bookmark={b} />
    })

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Url</td>
                        <td>Rating</td>
                    </tr>
                </thead>
                <tbody>
                    {bookmarkRows}
                </tbody>
            </table>
        </div>
    );
};

BookmarkListing.propTypes = {
    bookmarks: T.arrayOf(bookmarkShapeWithReview).isRequired
}

export default BookmarkListing;