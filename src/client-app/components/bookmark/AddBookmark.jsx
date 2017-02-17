import React, { Component, PropTypes as T } from 'react';
import { addBookmark } from '../../redux/bookmark/actions'
import { connect } from 'react-redux'
import TagForm from '../tag/TagForm'
import { mapTag } from '../../redux/tag/selectors'

class AddBookmark extends Component {
    static propTypes = {
        addBookmark: T.func.isRequired,
        mapTag: T.func.isRequired
    }

    constructor() {
        super();

        this.onTitleBlur = this.onTitleBlur.bind(this);
        this.onUrlBlur = this.onUrlBlur.bind(this);
        this.addBookmark = this.addBookmark.bind(this);
        this.onTagSelect = this.onTagSelect.bind(this);

        this.state = {
            title: '',
            url: '',
            tags: []
        }
    }

    onTitleBlur(evt) {
        const title = evt.target.value;
        this.setState({
            title
        })
    }

    onUrlBlur(evt) {
        const url = evt.target.value;
        this.setState({
            url
        })
    }

    addBookmark() {
        const {title, url, tags} = this.state;
        const {addBookmark} = this.props;

        this.setState({
            title: '',
            url: ''
        })

        addBookmark({ title, url, tags })
    }

    onTagSelect(tag) {
        const {tags} = this.state;

        this.setState({
            tags: [...tags, tag.id]
        })
    }

    render() {
        const {title, url, tags} = this.state;
        const {mapTag} = this.props;

        const tagToRender = tags.map(mapTag).map(t => {
            return <div key={t.id}>
                {t.name}
            </div>
        })

        return (
            <div>
                <h2>Add Bookmark</h2>
                <div>
                    <div className="bm-input__row">
                        <label htmlFor="title" className="bm-input__label">Title</label>
                        <input type="text"
                            className="bm-input bm-input__text"
                            name="title"
                            defaultValue={title}
                            onBlur={this.onTitleBlur} />
                    </div>
                    <div className="bm-input__row">
                        <label htmlFor="url" className="bm-input__label">
                            Bookmark Url
                        </label>
                        <input type="text"
                            className="bm-input bm-input__text"
                            defaultValue={url}
                            name="url" onChange={this.onUrlBlur} />
                    </div>
                    <TagForm selectTag={this.onTagSelect}></TagForm>
                    {tagToRender}
                    <div className="bm-button" onClick={this.addBookmark}>
                        Add Bookmark
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mapTag: mapTag(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBookmark: bookmark => {
            dispatch(addBookmark(bookmark))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookmark)