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
                <div className="header">
                    Add Bookmark
                </div>
                <div className="form">
                    <div className="row">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" 
                        defaultValue={title}
                        onBlur={this.onTitleBlur}/>
                    </div>
                    <div className="row">
                        <label htmlFor="url">
                            Bookmark Url
                        </label>
                        <input type="text"
                        defaultValue={url}
                         name="url" onChange={this.onUrlBlur}/>
                    </div>
                    <div className="button" onClick={this.addBookmark}>
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