import React, { PropTypes as T } from 'react'
// import { fetchArea, createAreaNote } from '../../common/bookmarkClient'
import AddAreaNote from './AddAreaNote'
import AreaNote from './AreaNote'


const Area = ({area, onAddNote, tags}) => {
    const tagsToRender = tags.map(t => <div key={t.id}>{t.name}</div>)

    const notesToRender = area.notes.length
        ? area.notes.map(n => (<AreaNote key={n.id}
            title={n.title}
            className="bm-area__note"
            blurb={n.blurb}
            createdDate={n.createdDate} />))
        : <div>No Notes</div>

    return (<div className="bm-area">
        <h3>{area.name}</h3>
        <AddAreaNote
            onAddNote={onAddNote}
            areaId={area.id}
        />
        {notesToRender}
        {tagsToRender}
    </div>)
}

Area.propTypes = {
    area: T.shape({
        id: T.string.isRequired,
        name: T.string.isRequired,
        notes: T.arrayOf(T.shape({
            blurb: T.string.isRequired
        }))
    }),
    tags: T.arrayOf(T.shape({
        id: T.string.isRequired,
        name: T.string.isRequired
    })),
    onAddNote: T.func.isRequired
}

export default Area