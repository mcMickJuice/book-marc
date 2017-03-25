import React, { Component, PropTypes as T } from 'react'
import * as css from '../../styles/area-note-form'
import MarkdownEditor from '../../elements/MarkdownEditor'

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

    onBlurbBlur(blurb) {
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
                    <MarkdownEditor onBlur={this.onBlurbBlur}/>
                </div>
                <div className="bm-button" onClick={this.onAddNote}>Add Note</div>
            </div>)
    }
}

export default AreaNoteForm