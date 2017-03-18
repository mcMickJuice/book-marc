import React, {PropTypes as T} from 'react'

const calcY = (y, chartY) => {
    //push datapoints down below lines 
    //...but not too far down. set minimum at 10 px below chart Y
    return Math.min(y + (chartY * .1), chartY - 10)
}

const CustomLabel = ({valueKey, x, y, height, payload,}) => {
    const value = payload[valueKey]

    const yPos = calcY(y, height)

    return <text x={x} y={yPos} textAnchor="middle" fill="#666">{value}</text>
}

CustomLabel.propTypes = {
    valueKey: T.number.isRequired,
    x: T.number.isRequired,
    y: T.number.isRequired,
    height: T.number.isRequired,
    payload: T.object.isRequired
}

export default CustomLabel