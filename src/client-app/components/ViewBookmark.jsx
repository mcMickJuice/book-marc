import React, {PropTypes as T} from 'react';
import {updateBookmarkAsRead, updateBookmarkDescription, updateBookmarkRating} from '../redux/bookmark/actions'
import {connect} from 'react-redux'
import BookmarkDescription from './BookmarkDescription'
import BookmarkUrlLink from './BookmarkUrlLink'

const ViewBookmark = ({bookmark, markAsRead, onDescriptionUpdate, onRatingUpdate}) => {

    const markAsReadElement = bookmark.isRead 
        ? bookmark.readDate
        : 
            <div className="bm-button" onClick={markAsRead}>
                Mark As Read
            </div>

    const bookmarkEditSection = bookmark.isRead
        ? <BookmarkDescription description={bookmark.description} 
        rating={bookmark.rating}
        onDescriptionUpdate={onDescriptionUpdate}
        onRatingUpdate={onRatingUpdate} />
        : '';
    return (
        <div>
        <div>
            <h3>{bookmark.title}</h3>
            <BookmarkUrlLink url={bookmark.url} />
        </div>
           <div >
                {markAsReadElement}
           </div>
           {bookmarkEditSection}
        </div>
    );
};

ViewBookmark.propTypes = {
    bookmark: T.shape({
        id: T.any.isRequired,
        title: T.string.isRequired,
        url: T.string.isRequired
    }),
    markAsRead: T.func.isRequired,
    onDescriptionUpdate: T.func.isRequired,
    onRatingUpdate: T.func.isRequired,
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {id} = ownProps.bookmark;
    const {bookmark} = ownProps;
    
    return {
        markAsRead: () => {
            dispatch(updateBookmarkAsRead(bookmark))
        },
        onRatingUpdate: (rating) => {
            dispatch(updateBookmarkRating({id, rating}))
        },
        onDescriptionUpdate: (description) => {
            dispatch(updateBookmarkDescription({id, description}))
        }
    }
}

export default connect(null, mapDispatchToProps)(ViewBookmark)