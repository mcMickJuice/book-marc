import React, {PropTypes as T} from 'react';
import {Link} from 'react-router'
import {updateBookmarkAsRead} from '../redux/bookmark/actions'
import {connect} from 'react-redux'

const ViewBookmark = ({bookmark, markAsRead}) => {

    const markAsReadElement = bookmark.isRead 
        ? bookmark.readDate
        : 
            <div className="bm-button" onClick={markAsRead}>
                Mark As Read
            </div>


    return (
        <div>
        <div>
            <h3>{bookmark.title}</h3>
           <a href={bookmark.url} target="_blank">(Open Article)</a> 
        </div>
           <div >
                {markAsReadElement}
           </div>

           <div>
            <Link to={`/bookmark/${bookmark.id}/edit`}>Edit this</Link>
           </div>
        </div>
    );
};

ViewBookmark.propTypes = {
    bookmark: T.shape({
        id: T.any.isRequired,
        title: T.string.isRequired,
        url: T.string.isRequired
    }),
    markAsRead: T.func.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log(ownProps);
    const {bookmark} = ownProps;
    
    return {
        markAsRead: () => {
            dispatch(updateBookmarkAsRead(bookmark))
        }
    }
}

export default connect(null, mapDispatchToProps)(ViewBookmark)