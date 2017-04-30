/* @flow */
import React, { Component } from 'react';
import { searchBookmarksByTitle, searchBookmarksByTag } from '../../common/bookmarkService'
import debounce from 'lodash.debounce'
import TagSearch from '../tag/TagSearch'
import Tag from '../tag/Tag'
import * as css from '../../styles/bookmark-search'

export type Props = {
    onSearchResults: Function,
    onSearchReset: Function,
};

class BookmarkSearch extends Component {
    performSearch: Function;
    onRemoveTag: Function;
    onTagSelect: Function;
    onSearchChange: Function;
    constructor() {
        super()

        this.onTagSelect = this.onTagSelect.bind(this);
        this.onRemoveTag = this.onRemoveTag.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.performSearch = debounce(this.performSearch.bind(this), 500)

        this.state = {
            selectedTag: null,
            searchTerm: ''
        }
    }

    props: Props;

    onSearchChange(evt) {
        const {value} = evt.target;

        this.setState({
            searchTerm: value,
            selectedTag: null
        })

        this.performSearch(value)
    }

    onTagSelect(tag) {
        const {onSearchResults} = this.props;

        this.setState({
            selectedTag: tag,
            searchTerm: ''
        })

        searchBookmarksByTag(tag.id)
            .then(bookmarks => {
                onSearchResults(bookmarks)
            })
    }

    onRemoveTag() {
        const {onSearchReset} = this.props;

        this.setState({
            selectedTag: null
        })

        onSearchReset();
    }

    performSearch(text) {
        const {onSearchResults, onSearchReset} = this.props;

        const trimmedSearch = text.trim();
        if (trimmedSearch.length == 0) {
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
        const {selectedTag, searchTerm} = this.state;

        return <div className="bm-bookmark-search">
            <div className="bm-bookmark-search__title">
                <input type="text"
                    value={searchTerm}
                    placeholder="Search by Title"
                    onChange={this.onSearchChange} />
            </div>
            <div className="bm-bookmark-search__divider">
                <div>OR</div>
            </div>
            <div className="bm-bookmark-search__tag">
                <TagSearch selectTag={this.onTagSelect}></TagSearch>
                {selectedTag &&
                    <div className="bm-bookmark-search__tag__selected">
                        <Tag name={selectedTag.name} id={selectedTag.id} onRemoveTag={this.onRemoveTag}></Tag>
                    </div>}

            </div>
        </div>
    }
}

export default BookmarkSearch