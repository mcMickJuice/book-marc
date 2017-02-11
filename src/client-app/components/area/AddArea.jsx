import React, {Component, PropTypes} from 'react'
import {createArea} from '../../common/bookmarkClient'

class AddArea extends Component {
    constructor() {
        super();

        this.onNameBlur = this.onNameBlur.bind(this);
        this.addArea = this.addArea.bind(this);

        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    onNameBlur(evt) {
        const name = evt.target.value

        this.setState({
            name
        })
    }

    addArea() {
        const {name} = this.state
        const {push} = this.props.history

        this.setState({
            name: ''
        })
        createArea({name})
            .then(area => {
                push(`/area/${area.id}`)
            })
    }

    
    render() {
        const {name} = this.state;

        return (<div>
            <h3>Create Area</h3>
            <div>
                <div className="bm-input__row">
                    <label htmlFor="name" className="bm-input__label">Area Name</label>
                    <input type="text"
                        className="bm-input bm-input__text"
                        name="name"
                        defaultValue={name}
                        onBlur={this.onNameBlur}
                    />
                </div>
                <div className="bm-button" onClick={this.addArea}>
                    Add Area
                </div>
            </div>
        </div>)
    }
}

export default AddArea