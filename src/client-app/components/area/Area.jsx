import React, { Component, PropTypes as T } from 'react'
import { fetchArea, createAreaNote } from '../../common/bookmarkClient'
import AddAreaNote from './AddAreaNote'

class Area extends Component {
    static propTypes = {
        params: T.any
    }

    constructor() {
        super()

        this.toggleAddNote = this.toggleAddNote.bind(this)
        this.onAddNote = this.onAddNote.bind(this);

        this.state = {
            area: null,
            showNote: false,
            notes: []
        }
    }

    componentDidMount() {
        const {id} = this.props.routeParams;

        fetchArea(id)
            .then(({area, notes}) => {
                this.setState({ 
                    area,
                    notes 
                })
            })
    }

    onAddNote(note) {
        this.toggleAddNote();
        //make ajax call
        createAreaNote(note)
            .then(createdNote => {
                console.log(createdNote)
                this.setState({
                    notes: [createdNote, ...this.state.notes]
                })
            })
    }

    toggleAddNote() {
        this.setState({
            showNote: !this.state.showNote
        })
    }

    render() {
        const {area, showNote, notes} = this.state;

        const toRender = area == null
            ? <div>Loading</div>
            : <div>
                {area.name}
            </div>

        const notesToRender = notes.length 
            ? notes.map(n => (<div key={n.id}>{n.blurb}</div>))
            : <div>No Notes</div> 

        return (<div>
            {toRender}
            {showNote
                ? <AddAreaNote
                    onAddNote={this.onAddNote}
                    onCancel={this.toggleAddNote}
                    areaId={area.id}
                />
                : <div className="bm-button" onClick={this.toggleAddNote}>Add Area Note</div>
            }
            {notesToRender}

        </div>)
    }
}

export default Area