/* @flow */
import React, { Component, PropTypes as T } from 'react';
import {getRecentBookmarks} from '../../common/bookmarkService'
import BookmarkSearch from './BookmarkSearch'
import BookmarkRow from './BookmarkRow'
import {Link} from 'react-router'
import * as css from '../../styles/bookmark-home'

export type Props = {};

class BookmarkHome extends Component {
    onSearchReset: Function;
    onSearchResults: Function;
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

    props: Props;

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
            ? bookmarks.map(bm => <BookmarkRow key={bm.id} bookmark={bm}/>)
            : <span className="bm-bookmark-home--pending">{isLoading ? 'Loading' : 'No Bookmarks Found'}</span>

        return <div className="bm-bookmark-home">
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