import React, { PropTypes as T } from 'react'
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
    { week: 'Feb 1', added: 10, read: 4 },
    { week: 'Feb 8', added: 23, read: 23 },
    { week: 'Feb 15', added: 31, read: 13 },
    { week: 'Feb 22', added: 14, read: 21 },
    { week: 'March 1', added: 27, read: 4 }
]

const NoZeroTick = ({ x, y, stroke, payload }) => {

    if (payload.value === 0) return null;

    return <g>
        <text x={x - 25} y={y + 5} fill="#666" >{payload.value}</text>
    </g>
}

const calcY = (y, chartY) => {
    //push datapoints down below lines 
    //...but not too far down. set minimum at 10 px below chart Y
    return Math.min(y + (chartY * .1), chartY - 10)
}

const calcX = (x, chartX) => {
    const edgeMin = 5;
    console.log(x, chartX)
    if(x < edgeMin){
        return edgeMin
    } else if (chartX - x < edgeMin){
        return chartX - edgeMin
    } else{
        return x
    }
}

const CustomLabel = ({valueKey, x, y, height, width,...props}) => {
    const value = props.payload[valueKey]
    console.log(props)

    const yPos = calcY(y, height)

    return <text x={x} y={yPos} textAnchor="middle">{value}</text>
}

const BookmarkActivityChart = () => {
    return (<ResponsiveContainer>
        <AreaChart
            data={data}>
            <XAxis dataKey="week" padding={{ right: 20 }} />
            <YAxis padding={{ bottom: 1 }} tick={NoZeroTick} />
            <Tooltip />
            <Area type="linear" dataKey="added" stackId="1" stroke="#8884d8" fill="#8884d8" label={<CustomLabel valueKey="added" />} />
            <Area type="linear" dataKey="read" stackId="1" stroke="#ffc658" fill="#ffc658" label={<CustomLabel valueKey="read" />} />
            <Area />
        </AreaChart>
    </ResponsiveContainer>)
}

BookmarkActivityChart.propTypes = {}

export default BookmarkActivityChart
