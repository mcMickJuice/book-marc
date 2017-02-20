import React, {PropTypes as T} from 'react'

const RatingBlock = ({activeColor, score, currentIdx}) => {
    const style = {
        'backgroundColor': activeColor,
        borderColor: activeColor
    }

    const notRated = (currentIdx + 1) > (score || 0)

    return <div style={notRated ? {} : style}
        className={`bm-rating__block ${notRated ? 'bm-rating__block--inactive': ''}`}>

    </div>
}

RatingBlock.propTypes = {
    activeColor: T.string.isRequired,
    score: T.number.isRequired,
    currentIdx: T.number.isRequired
}

export default RatingBlock