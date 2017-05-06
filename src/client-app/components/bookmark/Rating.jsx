/* @flow */
import React from 'react';
import { range, noop } from '../../common/utility'
import RatingBlock from './RatingBlock'
import * as css from '../../styles/rating'

const MAX_SCORE = 5;

const scoreLabelMap = {
    '1': { color: '#c71212', label: 'Prolly should delete' },
    '2': { color: '#d48f11', label: 'Bad' },
    '3': { color: 'gold', label: 'Just OK' },
    '4': { color: 'lightgreen', label: 'Pretty Good' },
    '5': { color: 'darkgreen', label: 'Great!' }
}

const notRankedDescription = { color: '', label: 'Not Ranked' }

const getScoreDescription = (score?: number) => {
    if(score == null){
        return notRankedDescription
    }
    return scoreLabelMap[score]
}

export type Props = {
    score?: number,
    onHover?: Function,
    onRatingSelect?: Function,
};

const Rating = (props: Props) => {
    const { score, onHover = noop, onRatingSelect = noop } = props;
    const description = getScoreDescription(score)

    const ratingBars = range(MAX_SCORE).map(idx => <RatingBlock key={idx}
        activeColor={description.color}
        score={score}
        currentIdx={idx}
        onRatingSelect={onRatingSelect}
        onHover={onHover} />)

    return <div className="bm-rating">
        <div className="bm-rating__label">{description.label}</div>
        <div className="bm-rating__bars">
            {ratingBars}
        </div>
    </div>
}

export default Rating