import React, { PropTypes as T } from 'react'
import AreaNoteForm from './AreaNoteForm'
import AreaNote from './AreaNote'
import ToggleView from '../../elements/ToggleView'
import TagList from '../tag/TagList'

const toggleAddNoteFunc = (isOpen, onClick) => {
    return <div onClick={onClick}>
        {isOpen ? 'Close' : 'Add Note'}
    </div>
}

const Area = ({area, onAddNote}) => {
    const notesToRender = area.notes.length
        ? area.notes.map(n => (<AreaNote key={n.id}
            title={n.title}
            className="bm-area__note"
            blurb={n.blurb}
            createdDate={n.createdDate} />))
        : <div>No Notes</div>

    return (<div className="bm-area">
        <h3>{area.name}</h3>
        <TagList tags={area.tags} />
        
        <ToggleView toggleButtonFunc={toggleAddNoteFunc}>
            <AreaNoteForm
            onAddNote={onAddNote}
            areaId={area.id}
        />
        </ToggleView>
        {notesToRender}
    </div>)
}

Area.propTypes = {
    area: T.shape({
        id: T.string.isRequired,
        name: T.string.isRequired,
        notes: T.arrayOf(T.shape({
            blurb: T.string.isRequired
        })),
        tags: T.arrayOf(T.string)
    }),
    onAddNote: T.func.isRequired
}

export default Area