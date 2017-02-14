import React, {Component, PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {createTag} from '../../redux/tag/actions'
import {searchTags} from '../../redux/tag/selectors'
import Tag from './Tag'
import * as css from '../../styles/tag-creator'

class TagCreator extends Component {
    static propTypes = {
        createTag: T.func.isRequired,
        searchTags: T.func.isRequired,
        selectTag: T.func.isRequired
    }
    
    constructor() {
        super();

        this.onCreateTag = this.onCreateTag.bind(this);
        this.onTagSearchChange = this.onTagSearchChange.bind(this);

        this.state = {
            tagSearch: '',
            tags: []
        }
    }

    onTagSearchChange(evt) {
        const tagSearch = evt.target.value;
        const {searchTags} = this.props;

        //search existing tags
        const tags = tagSearch === '' ? [] : searchTags(tagSearch)

        this.setState({
            tagSearch,
            tags
        })
    }

    onCreateTag() {
        const {createTag} = this.props;
        const {tagSearch} = this.state;
        const tag = {
            name: tagSearch
        }

        //TODO guard against duplicate tags, empty strings
        this.setState({
            tagSearch: '',
            tags: []
        })
        createTag(tag)
    }

    render() {
        const {tags, tagSearch} = this.state
        const {selectTag} = this.props;

        const tagResult = tags.length > 0
            ? tags.map(t => (<Tag key={t.id}
            onClick={() => selectTag(t)}
            name={t.name}>
            </Tag>))
            : <div>No tags match you search</div>

        return (<div className="bm-tag-creator">
            <h3>
                Add Tag
            </h3>
            <div className="bm-input__row">
                <label htmlFor="tagSearch">Search Tags</label>
                <input type="text" name="tagSearch" 
                className="bm-input bm-input__text" 
                value={tagSearch}
                onChange={this.onTagSearchChange}
                onBlur={this.onTagSearchBlur}/>
                <div className="bm-button" onClick={this.onCreateTag}>Add Tag</div>
            </div>
            <div className="bm-input__row">
                <label htmlFor="">Available Tags</label>
                <div className="bm-tag-creator__available-tags">
                    {tagResult}
                </div>
            </div>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        searchTags: searchTags(state)
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