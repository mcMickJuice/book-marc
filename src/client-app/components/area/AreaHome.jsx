import React, {Component, PropTypes as T} from 'react'
import {Link} from 'react-router'
import {getAllAreas} from '../../common/areaService'

class Area extends Component {
    constructor() {
        super();

        this.state = {
            areas: [],
            isLoading: true
        }
    }

    componentDidMount() {
        getAllAreas()
            .then(areas => {
                this.setState({
                    areas,
                    isLoading: false
                })
            })
    }

    render() {
        const {areas, isLoading} = this.state; 

        const areaToRender = areas.map(a => {
            return <div key={a.id}>
                <Link to={`/area/${a.id}`}>{a.name}</Link>
            </div>
        })

        return (<div>
            <h3>Areas</h3>
            <Link to="/area/add">Create Area</Link>
            <div>
                {/*oh yay nested ternaries*/}
                {isLoading 
                    ? 'Is Loading'
                    : areas.length
                        ? areaToRender
                        : 'No Areas'}
            </div>
        </div>)
    }
}

export default (Area)
