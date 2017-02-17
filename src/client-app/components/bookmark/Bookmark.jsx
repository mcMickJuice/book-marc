import React, { Component, PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {bookmarkShapeWithReview} from '../../common/bookmarkShape'
import {getRecentBookmarks} from '../../redux/bookmark/actions'
import {getBookmarks} from '../../redux/bookmark/selectors'
import BookmarkListing from './BookmarkListing'
import {Link} from 'react-router'

class Bookmark extends Component {
    static propTypes = {
        fetchBookmarks: T.func.isRequired,
        bookmarks: T.arrayOf(bookmarkShapeWithReview)
    }

    componentDidMount() {
        this.props.fetchBookmarks()
    }

    render() {
        const {bookmarks} = this.props;

        const toRender = bookmarks.length > 0
            ? <BookmarkListing bookmarks={bookmarks} />
            : <div>No Bookmarks Available</div>

        return (<div>
            <h3>Bookmarks (<Link to="/bookmark/add">Add</Link>)</h3>
            {toRender}
        </div>)
    }
}

const mapStateToProps = (state) => {
    const bookmarks = getBookmarks(state);
    return {
        bookmarks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBookmarks: () => {
            dispatch(getRecentBookmarks())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);