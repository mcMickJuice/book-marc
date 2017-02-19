import React, { Component, PropTypes as T } from 'react'
import * as css from '../../styles/area-note-form'

class AreaNoteForm extends Component {
    static propTypes = {
        onAddNote: T.func.isRequired,
        areaId: T.string.isRequired,
        onCancel: T.func
    }

    constructor() {
        super();

        this.onAddNote = this.onAddNote.bind(this);
        this.onBlurbBlur = this.onBlurbBlur.bind(this);
        this.onTitleBlur = this.onTitleBlur.bind(this);

        this.state = {
            title: '',
            blurb: '',
            showNote: false
        }
    }

    onAddNote() {
        const {onAddNote, areaId} = this.props;
        const {blurb, title} = this.state;

        const note = {
            title,
            blurb,
            createdDate: Date.now(),
            areaId
        }

        onAddNote(note);
    }

    onTitleBlur(evt) {
        const title = evt.target.value;

        this.setState({
            title
        })
    }

    onBlurbBlur(evt) {
        const blurb = evt.target.value;

        this.setState({
            blurb
        })
    }

    render() {
        return (<div>
                <div className="bm-input__row">
                    <input type="text" placeholder="Add a Title" onBlur={this.onTitleBlur} />
                </div>
                <div className="bm-input__row">
                    <div>
                        <textarea name="blurb"
                            id="blurb"
                            placeholder="Add a Blurb!"
                            cols="30"
                            rows="10"
                            onBlur={this.onBlurbBlur}
                        ></textarea>
                    </div>
                </div>
                <div className="bm-button" onClick={this.onAddNote}>Add Note</div>
            </div>)
    }
}

export default AreaNoteForm