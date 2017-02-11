import React, {Component, PropTypes as T} from 'react'
import {fetchArea} from '../../common/bookmarkClient'

class Area extends Component {
    static propTypes = {
        params: T.any
    }

    constructor() {
        super()

        this.state = {
            area: null
        }
    }

    componentDidMount() {
        const {id} = this.props.routeParams;

        fetchArea(id)
            .then(area => {
                this.setState({area})
            })
    }
    
    render() {
        const {area} = this.state;

        const toRender = area == null
            ? <div>Loading</div>
            : <div>
                {area.name}
            </div>

        return (<div>
            {toRender}
        </div>)
    }
}

export default Area