import React, { PropTypes as T } from 'react'
import Card from '../../elements/Card'
import Date from '../../elements/Date'

const AreaNote = ({title, blurb, createdDate, className}) => {
    return (<Card className={className}>
        <h3>{title}</h3>
        <div>
            {blurb}
        </div>
        <div>
            <Date date={createdDate} />
        </div>
    </Card>)
}

AreaNote.propTypes = {
    blurb: T.string.isRequired,
    createdDate: T.number.isRequired,
    title: T.string.isRequired,
    className: T.string
}

export default AreaNote
