/* @flow */
import React from 'react';
import {
    updateBookmarkAsRead,
    updateBookmarkDescription,
    updateBookmarkRating,
    addTagToBookmark,
    removeTagFromBookmark
} from '../../redux/bookmark/actions'
import { connect } from 'react-redux'
import BookmarkDescription from './BookmarkDescription'
import BookmarkUrlLink from './BookmarkUrlLink'
import Date from '../../elements/Date'
import TagList from '../tag/TagList'
import TagForm from '../tag/TagForm'

export type Props = {
    bookmark: BookmarkType,
    markAsRead: Function,
    onDescriptionUpdate: Function,
    onRatingUpdate: Function,
    onTagAdd: Function,
    onTagRemove: Function,
};

const ViewBookmark = (props: Props) => {
    const {bookmark, markAsRead, onDescriptionUpdate, onRatingUpdate, onTagAdd, onTagRemove} = props;

    const markAsReadElement = bookmark.readDate != null
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

    return (
        <div>
            <div>
                <h3>{bookmark.title} (<BookmarkUrlLink url={bookmark.url}>
                    Open Link
            </BookmarkUrlLink>)
            </h3>
                <TagForm selectTag={onTagAdd} />
                <TagList tags={bookmark.tags} onRemoveTag={onTagRemove}></TagList>
            </div>
            <div >
                {markAsReadElement}
            </div>
            {bookmarkEditSection}
        </div>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {id} = ownProps.bookmark;
    const {bookmark} = ownProps;

    return {
        markAsRead: () => {
            dispatch(updateBookmarkAsRead(bookmark))
        },
        onRatingUpdate: (rating) => {
            dispatch(updateBookmarkRating({ id, rating }))
        },
        onDescriptionUpdate: (description) => {
            dispatch(updateBookmarkDescription({ id, description }))
        },
        onTagAdd: tag => {
            if ((bookmark.tags || []).indexOf(tag.id) > -1) return;

            dispatch(addTagToBookmark(bookmark.id, tag.id))
        },
        onTagRemove: tagId => {
            dispatch(removeTagFromBookmark(bookmark.id, tagId))
        }
    }
}

export default connect(null, mapDispatchToProps)(ViewBookmark)