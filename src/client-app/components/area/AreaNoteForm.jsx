/* @flow */
import React, { Component } from 'react';
import * as css from '../../styles/area-note-form'
import MarkdownEditor from '../../elements/MarkdownEditor'

export type Props = {
    onAddNote: Function,
    areaId: string,
    onCancel?: Function,
};

type State = {
    title: string,
    blurb: string,
    showNote: boolean,
};

class AreaNoteForm extends Component {
    state: State;
    onBlurbBlur: Function;
    onTitleBlur: Function;
    onAddNote: Function;
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

    props: Props;

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

    onTitleBlur(evt: any) {
        const title = evt.target.value;

        this.setState({
            title
        })
    }

    onBlurbBlur(blurb: string) {
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