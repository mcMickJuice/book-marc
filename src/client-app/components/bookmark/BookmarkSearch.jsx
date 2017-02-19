import React, { Component, PropTypes as T } from 'react'
import { searchBookmarksByTitle, searchBookmarksByTag } from '../../common/bookmarkClient'
import debounce from 'lodash.debounce'
import TagSearch from '../tag/TagSearch'
import Tag from '../tag/Tag'

class BookmarkSearch extends Component {
    static propTypes = {
        onSearchResults: T.func.isRequired,
        onSearchReset: T.func.isRequired
    }

    constructor() {
        super()

        this.onTagSelect = this.onTagSelect.bind(this);
        this.onRemoveTag = this.onRemoveTag.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.performSearch = debounce(this.performSearch.bind(this), 500)

        this.state = {
            selectedTag: null
        }
    }

    onSearchChange(evt) {
        const {value} = evt.target;

        this.performSearch(value)
    }

    onTagSelect(tag) {
        const {onSearchResults} = this.props;

        this.setState({
            selectedTag: tag
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
        const {selectedTag} = this.state;

        return <div>
            <div>
                <input type="text" 
                placeholder="Search by title" 
                onChange={this.onSearchChange} />
            </div>
            <div>
                <TagSearch selectTag={this.onTagSelect}></TagSearch>
                {selectedTag && <Tag name={selectedTag.name} onRemoveTag={this.onRemoveTag}></Tag>}
            </div>
        </div>
    }
}

export default BookmarkSearch