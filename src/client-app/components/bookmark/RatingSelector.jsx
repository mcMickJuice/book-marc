import React, { Component, PropTypes as T } from 'react'
import Rating from './Rating'
import debounce from 'lodash.debounce'

class RatingSelector extends Component {
    static propTypes = {
        initialRating: T.number,
        onRatingSelect: T.func.isRequired
    }

    constructor(props) {
        super(props);

        this.changeBlockState = debounce(this.changeBlockState, 75)

        const {initialRating = 0} = props;
        this.state = {
            defaultScore: initialRating,
            activeScore: initialRating
        }
    }

    onRatingBlockHover = (score, evt) => {
        const {type} = evt;
        const {defaultScore} = this.state

        const scoreToApply = type === 'mouseenter' ? score : defaultScore


        this.changeBlockState(scoreToApply)
    }

    onRatingSelect = score => {
        const {onRatingSelect} = this.props

        onRatingSelect(score)
        
        this.setState({
            defaultScore: score,
            activeScore: score
        })
    }

    changeBlockState = (score) => {
        this.setState({
            activeScore: score
        })
    }

    render() {
        const {activeScore} = this.state

        return <Rating onHover={this.onRatingBlockHover}
            onRatingSelect={this.onRatingSelect}
            score={activeScore} />
    }
}

export default RatingSelector