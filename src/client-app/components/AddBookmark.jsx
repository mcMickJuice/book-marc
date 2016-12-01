import React, {Component, PropTypes as T} from 'react';
import {addBookmark} from '../redux/bookmark/actions'
import {connect} from 'react-redux'

class AddBookmark extends Component {
    constructor() {
        super();

        this.onTitleBlur = this.onTitleBlur.bind(this);
        this.onUrlBlur = this.onUrlBlur.bind(this);
        this.addBookmark = this.addBookmark.bind(this);

        this.state = {
            title: '',
            url: ''
        }
    }

    static propTypes = {
        addBookmark: T.func.isRequired
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
        const {title, url} = this.state;
        const {addBookmark} = this.props;

        this.setState({
            title: '',
            url: ''
        })

        addBookmark({title, url})
    }

    render() {
        const {title, url} = this.state;

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
                            onBlur={this.onTitleBlur}/>
                    </div>
                    <div className="bm-input__row">
                        <label htmlFor="url" className="bm-input__label">
                            Bookmark Url
                        </label>
                        <input type="text"
                            className="bm-input bm-input__text"
                            defaultValue={url}
                            name="url" onChange={this.onUrlBlur}/>
                    </div>
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