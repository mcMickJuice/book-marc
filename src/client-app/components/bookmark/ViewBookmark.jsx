import React, {PropTypes as T} from 'react';
import {updateBookmarkAsRead, updateBookmarkDescription, updateBookmarkRating} from '../../redux/bookmark/actions'
import {connect} from 'react-redux'
import BookmarkDescription from './BookmarkDescription'
import BookmarkUrlLink from './BookmarkUrlLink'
import Date from'../../elements/Date'
import {mapTag} from '../../redux/tag/selectors'

const ViewBookmark = ({bookmark, markAsRead, onDescriptionUpdate, onRatingUpdate, mapTag}) => {

    const markAsReadElement = bookmark.isRead 
        ? <Date date={bookmark.readDate} />
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

    const tags = (bookmark.tags || []).map(mapTag).map(t => {
        return <div key={t.id}>
            {t.name}
        </div>
    })

    return (
        <div>
        <div>
            <h3>{bookmark.title}</h3>
            <BookmarkUrlLink url={bookmark.url} />
            {tags}
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
    mapTag: T.func.isRequired,
    onTagAdd: T.func.isRequired
}

const mapStateToProps = state => {
    return {
        mapTag: mapTag(state)
    }
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
        },
        onTagAdd: (tagId) => {

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewBookmark)