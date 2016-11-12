import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bookmarkShapeWithReview} from '../common/bookmarkShape'
import {getRecentBookmarks} from '../redux/bookmark/actions'
import {getBookmarks} from '../redux/bookmark/selectors'
import BookmarkListing from './BookmarkListing'

class Home extends Component {
    constructor() {
        super()
    }

    static propTypes = {
        fetchBookmarks: PropTypes.func.isRequired,
        bookmarks: PropTypes.arrayOf(bookmarkShapeWithReview)
    }

    componentDidMount() {
        this.props.fetchBookmarks()
    }

    render() {
        const {bookmarks} = this.props;

        const toRender = bookmarks.length > 0
            ? <BookmarkListing bookmarks={bookmarks} />
            : <div>Bookmarks loading</div>
        return (
            <div>
                {toRender}
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);