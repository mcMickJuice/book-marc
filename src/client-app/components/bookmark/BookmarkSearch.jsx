import React, { Component, PropTypes as T } from 'react'
import { searchBookmarksByTitle, searchBookmarksByTag } from '../../common/bookmarkClient'
import debounce from 'lodash.debounce'
import TagCreator from '../tag/TagCreator'

class BookmarkSearch extends Component {
    static propTypes = {
        onSearchResults: T.func.isRequired,
        onSearchReset: T.func.isRequired
    }

    constructor() {
        super()

        this.onTagSelect = this.onTagSelect.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.performSearch = debounce(this.performSearch.bind(this), 500)
    }

    onSearchChange(evt) {
        const {value} = evt.target;

        this.performSearch(value)
    }

    onTagSelect(tag) {
        const {onSearchResults} = this.props;

        searchBookmarksByTag(tag.id)
            .then(bookmarks => {
                onSearchResults(bookmarks)
            })
    }

    performSearch(text) {
        const {onSearchResults, onSearchReset} = this.props;

        const trimmedSearch = text.trim();
        if(trimmedSearch.length == 0)
        {
            onSearchReset()
        }

        if (trimmedSearch.length < 3) {
            return
        }

        searchBookmarksByTitle(trimmedSearch)
            .then(bookmarks => {
                onSearchResults(bookmarks);
            })
    }

    render() {
        return <div>
            <div>
            <input type="text" placeholder="Search by title" onChange={this.onSearchChange} />

            </div>
            <div>
                <TagCreator selectTag={this.onTagSelect}></TagCreator>
            </div>
        </div>
    }
}

export default BookmarkSearch