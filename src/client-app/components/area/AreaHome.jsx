import React, {Component, PropTypes as T} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {loadAllAreas} from '../../redux/area/actions'

class Area extends Component {
    static propTypes = {
        dispatch: T.func.isRequired
    }

    constructor() {
        super();

        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(loadAllAreas())
            .then(() => {
                this.setState({
                    isLoading: false
                })
            })
    }

    render() {
        const {isLoading} = this.state;

        return (<div>
            <h3>Areas</h3>
            <div>
                {isLoading 
                ? 'Loading' 
                : <Link to="/area/add">Create Area</Link>}
            </div>
        </div>)
    }
}

export default connect()(Area)
