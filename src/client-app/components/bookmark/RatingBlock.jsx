import React, {PropTypes as T} from 'react'

const RatingBlock = ({activeColor, score, currentIdx, onHover, onRatingSelect}) => {
    const style = {
        'backgroundColor': activeColor,
        borderColor: activeColor
    }

    const thisScore = currentIdx + 1
    const notRated = thisScore > (score || 0)

    return <div style={notRated ? {} : style}
        onMouseEnter={evt => onHover(thisScore, evt)}
        onMouseLeave={evt => onHover(thisScore, evt)}
        onClick={() => onRatingSelect(thisScore)}
        className={`bm-rating__block ${notRated ? 'bm-rating__block--inactive': ''}`}>

    </div>
}

RatingBlock.propTypes = {
    activeColor: T.string.isRequired,
    score: T.number,
    currentIdx: T.number.isRequired,
    onHover: T.func.isRequired,
    onRatingSelect: T.func.isRequired
}

export default RatingBlock