/* @flow */
import React, { Component } from 'react';
import {Link} from 'react-router'
import {getAllAreas} from '../../common/areaService'

export type Props = {};

class Area extends Component {
    constructor() {
        super();

        this.state = {
            areas: [],
            isLoading: true
        }
    }

    props: Props;

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
            <h3>Areas (<Link to="/area/add">Add</Link>)</h3>
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
