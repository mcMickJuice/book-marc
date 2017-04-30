/* @flow */
import React from 'react';

export type Props = {
    activeColor: string,
    score?: number,
    currentIdx: number,
    onHover: Function,
    onRatingSelect: Function,
};

const RatingBlock = (props: Props) => {
    const {activeColor, score, currentIdx, onHover, onRatingSelect} = props;
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

export default RatingBlock