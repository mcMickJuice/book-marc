/* @flow */
import React, { PropTypes as T, Component } from 'react';
import AreaNoteForm from './AreaNoteForm'
import AreaNote from './AreaNote'
import TagList from '../tag/TagList'
import TagForm from '../tag/TagForm'

const sortByLatestDate = (first, second) => {
    return second.createdDate - first.createdDate
}

export type Props = {
    area?: {
        id: string,
        name: string,
        notes?: Array<{ blurb: string }>,
        tags?: Array<string>,
    },
    onAddNote: Function,
    onTagAdded: Function,
    onTagRemoved: Function,
};

class Area extends Component {
    onAddNote: Function;
    toggleNoteForm: Function;
    constructor() {
        super();

        this.toggleNoteForm = this.toggleNoteForm.bind(this);
        this.onAddNote = this.onAddNote.bind(this);

        this.state = {
            isAddingNote: false
        }
    }

    props: Props;

    toggleNoteForm() {
        this.setState(state => ({
            isAddingNote: !state.isAddingNote
        }))
    }

    onAddNote(note) {
        const { onAddNote } = this.props;

        this.setState({
            isAddingNote: false
        })

        onAddNote(note);
    }

    render() {

        const { area, onTagAdded, onTagRemoved } = this.props;
        const { isAddingNote } = this.state;
        const notesToRender = area.notes.length
            ? area.notes
                .sort(sortByLatestDate)
                .map(n => (<AreaNote key={n.id}
                    title={n.title}
                    className="bm-area__note"
                    blurb={n.blurb}
                    createdDate={n.createdDate} />))
            : <div>No Notes</div>

        return (<div className="bm-area">
            <h3>{area.name}</h3>
            <TagForm selectTag={onTagAdded} />
            <TagList tags={area.tags} onRemoveTag={onTagRemoved} />
            <div onClick={this.toggleNoteForm}>
                {isAddingNote ? 'Close' : 'Add Note'}
            </div>
            {
                isAddingNote
                    ? <AreaNoteForm onAddNote={this.onAddNote}
                        areaId={area.id} />
                    : null
            }
            {notesToRender}
        </div>)

    }
}

export default Area