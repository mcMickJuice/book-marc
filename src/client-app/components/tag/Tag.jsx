import React, {PropTypes as T} from 'react'
import * as css from '../../styles/tag'

const Tag = ({name}) => {
    return <div className="bm-tag">
        {name}
    </div>
}

Tag.propTypes = {
    name: T.string.isRequired
}

export default Tag