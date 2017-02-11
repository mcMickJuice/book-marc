import React, {Component} from 'react'
import {Link} from 'react-router'

class Area extends Component {
    render() {
        return (<div>
            <h3>Areas</h3>
            This is area
            <div>
                <Link to="/area/add">Create Area</Link>
            </div>
        </div>)
    }
}

export default Area
