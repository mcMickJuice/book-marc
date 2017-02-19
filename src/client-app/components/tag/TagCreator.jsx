import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { createTag } from '../../redux/tag/actions'
import { searchTags, isValidTag } from '../../redux/tag/selectors'
import * as css from '../../styles/tag-creator'

const ARROW_UP = 38;
const ARROW_DOWN = 40;
const ENTER = 13;

const applicableKeys = [ARROW_UP, ARROW_DOWN, ENTER];

const calcIndex = (idx, keyCode, resultCount) => {
    if (keyCode === ARROW_DOWN) {
        return Math.min(idx + 1, resultCount - 1)
    }

    return Math.max(idx - 1, 0);
}

class TagCreator extends Component {
    static propTypes = {
        createTag: T.func.isRequired,
        searchTags: T.func.isRequired,
        selectTag: T.func.isRequired,
        isValidTag: T.func.isRequired
    }

    constructor() {
        super();

        this.onCreateTag = this.onCreateTag.bind(this);
        this.onTagSearchChange = this.onTagSearchChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onSelectTag = this.onSelectTag.bind(this);
        this.setResultIndex = this.setResultIndex.bind(this);

        this.state = {
            tagSearch: '',
            tags: [],
            currentIndex: 0
        }
    }

    componentDidMount() {
        this.container.addEventListener('keydown', this.onKeyDown)
    }

    componentWillUnmount() {
        this.container.removeEventListener('keydown', this.onKeyDown)
    }

    setResultIndex(index) {
        this.setState({
            currentIndex: index
        })
    }

    onKeyDown(evt) {
        const {keyCode} = evt;
        const {currentIndex, tags} = this.state;

        if (applicableKeys.indexOf(keyCode) === -1) {
            return;
        }

        evt.preventDefault();
        if (keyCode === ENTER) {
            if (currentIndex == -1) return;

            const tagToCreate = tags[currentIndex];

            this.onSelectTag(tagToCreate)
        } else {
            const index = calcIndex(currentIndex, keyCode, tags.length)
            this.setResultIndex(index)
        }
    }

    onTagSearchChange(evt) {
        let tagSearch = evt.target.value;
        const {searchTags} = this.props;

        const tags = tagSearch === '' ? [] : searchTags(tagSearch.trim())

        this.setState({
            tagSearch,
            tags,
            currentIndex: 0
        })
    }

    onSelectTag(tag) {
        const {selectTag} = this.props;

        selectTag(tag);

        this.setState({
            tagSearch: '',
            tags: []
        })
    }

    onCreateTag() {
        const {createTag, isValidTag} = this.props;
        const {tagSearch} = this.state;

        if (!isValidTag(tagSearch)) {
            return;
        }

        const tag = {
            name: tagSearch.trim()
        }

        this.setState({
            tagSearch: '',
            tags: []
        })
        createTag(tag)
    }

    render() {
        const {tags, tagSearch, currentIndex} = this.state
        const {isValidTag} = this.props;

        const isInvalidTag = !isValidTag(tagSearch)

        const tagResult = tags.map((t, idx) => (<div className={`bm-tag-creator__dropdown__item ${idx === currentIndex ? 'bm-tag-creator__dropdown__item--highlighted' : ''}`}
            key={t.id}
            onMouseEnter={() => this.setResultIndex(idx)}
            onClick={() => this.onSelectTag(t)}>{t.name}
        </div>))

        return (<div ref={(container) => { this.container = container }} className="bm-tag-creator">
                    <div className="bm-tag-creator__search-row">
                        <input type="text" name="tagSearch"
                            placeholder="Search Tags"
                            className="bm-tag-creator__search-row__input"
                            value={tagSearch}
                            onChange={this.onTagSearchChange}
                            onBlur={this.onTagSearchBlur} />
                        <div className={`bm-button ${isInvalidTag ? 'bm-button--disabled' : ''} bm-tag-creator__search-row__button`}
                            onClick={this.onCreateTag}>Add Tag</div>
                    </div>
                    <div className="bm-tag-creator__dropdown">
                        {tagResult}
                    </div>
                </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        searchTags: searchTags(state),
        isValidTag: isValidTag(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {selectTag} = ownProps;

    return {
        createTag: tag => {
            return dispatch(createTag(tag))
                .then(createdTag => {
                    selectTag(createdTag) //notify listener that tag is added
                })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagCreator)