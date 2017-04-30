/* @flow */
import React, { Component, PropTypes as T } from 'react';
import { addBookmark } from '../../redux/bookmark/actions'
import { connect } from 'react-redux'
import TagForm from '../tag/TagForm'
import TagList from '../tag/TagList'

export type Props = { addBookmark: Function };

class AddBookmark extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            url: '',
            tagIds: []
        }
    }

    props: Props;

    onTitleBlur = (evt) => {
        const title = evt.target.value;
        this.setState({
            title
        })
    }

    onUrlBlur = (evt) => {
        const url = evt.target.value;
        this.setState({
            url
        })
    }

    addBookmark = () => {
        const {title, url, tagIds} = this.state;
        const {addBookmark} = this.props;

        this.setState({
            title: '',
            url: ''
        })

        addBookmark({ title, url, tags: tagIds })
    }

    onTagSelect = (tag) => {
        const {tagIds} = this.state;

        if(tagIds.indexOf(tag.id) > -1) return;

        this.setState({
            tagIds: [...tagIds, tag.id]
        })
    }

    onTagRemove = (tagId) => {
        const {tagIds} = this.state;

        this.setState({
            tagIds: tagIds.filter(t => t !== tagId)
        })
    }

    render() {
        const {title, url, tagIds} = this.state;

        return (
            <div>
                <h2>Add Bookmark</h2>
                <div>
                    <div className="bm-input__row">
                        <label htmlFor="title" className="bm-input__label">Title</label>
                        <input type="text"
                            name="title"
                            defaultValue={title}
                            onBlur={this.onTitleBlur} />
                    </div>
                    <div className="bm-input__row">
                        <label htmlFor="url" className="bm-input__label">
                            Bookmark Url
                        </label>
                        <input type="text"
                            defaultValue={url}
                            name="url" onChange={this.onUrlBlur} />
                    </div>
                    <TagForm selectTag={this.onTagSelect}></TagForm>
                    <TagList tags={tagIds} onRemoveTag={this.onTagRemove}/>
                    <div className="bm-button" onClick={this.addBookmark}>
                        Add Bookmark
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBookmark: bookmark => {
            dispatch(addBookmark(bookmark))
        }
    }
}

export default connect(null, mapDispatchToProps)(AddBookmark)