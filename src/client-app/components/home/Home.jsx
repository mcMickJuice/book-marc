import React, {Component, PropTypes as T} from 'react';
import BookmarkActivityChart from './BookmarkActivityChart'

class Home extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div style={{width: '90%', height: '300px', margin: 'auto'}}>
                <BookmarkActivityChart></BookmarkActivityChart>
            </div>
        );
    }
}

export default Home