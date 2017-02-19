import React, { Component, PropTypes as T} from 'react'
import {getRecentBookmarks} from '../../common/bookmarkClient'
import BookmarkSearch from './BookmarkSearch'
import BookmarkListing from './BookmarkListing'
import {Link} from 'react-router'

class BookmarkHome extends Component {
    constructor(){
        super()

        this.onSearchResults = this.onSearchResults.bind(this);
        this.onSearchReset = this.onSearchReset.bind(this);

        this.state = {
            recentBookmarks: [],
            bookmarks: [],
            isLoading: true
        }
    }

    componentDidMount() {
        getRecentBookmarks()
            .then(recentBookmarks => {
                this.setState({
                    recentBookmarks,
                    bookmarks: recentBookmarks,
                    isLoading: false
                })
            })
    }

    onSearchResults(bookmarks) {
        this.setState({
            bookmarks
        })
    }

    onSearchReset() {
        const {recentBookmarks} = this.state;

        this.setState({
            bookmarks: recentBookmarks
        })
    }

    render() {
        const {bookmarks, isLoading} = this.state;

        const bookmarksToRender = bookmarks.length > 0
            ? <BookmarkListing bookmarks={bookmarks}/>
            : isLoading ? 'Loading' : 'No Bookmarks'

        return <div>
            <div>
                <h3>Bookmarks (<Link to="/bookmark/add">Add</Link>)</h3>
            </div>
            <div className="bm-bookmark-home__search">
                <BookmarkSearch onSearchResults={this.onSearchResults}
                    onSearchReset={this.onSearchReset}></BookmarkSearch>
            </div>
            <div className="bm-bookmark-home__results">
                {bookmarksToRender}
            </div>
        </div>
    }
}

export default BookmarkHome