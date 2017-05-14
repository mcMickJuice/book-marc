/* @flow */
import React, { Component } from 'react';
import Rating from './Rating'
import debounce from 'lodash.debounce'

export type Props = {
    initialRating?: number,
    onRatingSelect: Function,
};

type State = {
    defaultScore: any,
    activeScore: any,
};

class RatingSelector extends Component {
    state: State;
    constructor(props: Props) {
        super(props);

        this.changeBlockState = debounce(this.changeBlockState, 75)

        const { initialRating = 0 } = props;
        this.state = {
            defaultScore: initialRating,
            activeScore: initialRating
        }
    }

    props: Props;

    onRatingBlockHover = (score: number, evt: any) => {
        const type: string = evt.type;
        const { defaultScore } = this.state

        const scoreToApply = type === 'mouseenter' ? score : defaultScore


        this.changeBlockState(scoreToApply)
    }

    onRatingSelect = (score: number) => {
        const { onRatingSelect } = this.props

        onRatingSelect(score)

        this.setState({
            defaultScore: score,
            activeScore: score
        })
    }

    changeBlockState = (score: number) => {
        this.setState({
            activeScore: score
        })
    }

    render() {
        const { activeScore } = this.state

        return <Rating onHover={this.onRatingBlockHover}
            onRatingSelect={this.onRatingSelect}
            score={activeScore} />
    }
}

export default RatingSelector