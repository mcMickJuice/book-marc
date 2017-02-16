import React, {PropTypes as T} from 'react'
import {getDateString} from '../common/dateService'

const Date = ({date}) => {
    const dateString = getDateString(date);

    return <span>{dateString}</span>
}

Date.propTypes = {
    date: T.number.isRequired
}

export default Date