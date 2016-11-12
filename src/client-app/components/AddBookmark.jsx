import React, {Component, PropTypes} from 'react';
import RecentlyAddedBookmark from './RecentlyAddedBookmark';
import {addBookmark} from '../redux/bookmark/actions'
import {getBookmarks} from '../redux/bookmark/selectors'
import {connect} from 'react-redux'

class AddBookmark extends Component {
    constructor() {
        super();

        this.onTitleUpdate = this.onTitleUpdate.bind(this);
        this.onUrlUpdate = this.onUrlUpdate.bind(this);
        this.addBookmark = this.addBookmark.bind(this);

        this.state = {
            title: '',
            url: ''
        }
    }

    static propTypes = {
        addBookmark: PropTypes.func.isRequired,
        recentlyAdded: PropTypes.array.isRequired
    }
    
    onTitleUpdate(evt) {
        const title = evt.target.value;
        this.setState({
            title
        })
    }

    onUrlUpdate(evt) {
        const url = evt.target.value;
        this.setState({
            url
        })
    }

    addBookmark() {
        const {title, url} = this.state;
        const {addBookmark} = this.props;
        const bookmark = {title, url};

        this.setState({
            title: '',
            url: ''
        })

        addBookmark(bookmark)
    }

    render() {
        const {title, url} = this.state;
        const {recentlyAdded} = this.props;

        const recentBookmarkElements = recentlyAdded.map(bm => {
            return <RecentlyAddedBookmark key={bm.id} 
            title={bm.title}
            url={bm.url}
            id={bm.id} />
        })

        return (
            <div>
                <div className="header">
                    Add Bookmark
                </div>
                <div className="form">
                    <div className="row">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" 
                        value={title}
                        onChange={this.onTitleUpdate}/>
                    </div>
                    <div className="row">
                        <label htmlFor="url">
                            Bookmark Url
                        </label>
                        <input type="text"
                        value={url}
                         name="url" onChange={this.onUrlUpdate}/>
                    </div>

                    <div className="button" onClick={this.addBookmark}>
                        Add Bookmark
                    </div>
                </div>
                <div className="recently-added">
                    <h3>Recently Added</h3>
                    
                    {
                        recentBookmarkElements.length > 0 
                        ? recentBookmarkElements 
                        : <div>No Recently Added Elements</div>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const recentlyAdded = getBookmarks(state);

    return {
        recentlyAdded
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