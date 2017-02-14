import React, {Component, PropTypes as T} from 'react'
import {Link} from 'react-router'

class Area extends Component {
    constructor() {
        super();
    }

    render() {
        return (<div>
            <h3>Areas</h3>
            <Link to="/area/add">Create Area</Link>
        </div>)
    }
}

export default (Area)
