import React, { PropTypes as T } from 'react'
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const calcY = (y, chartY) => {
    //push datapoints down below lines 
    //...but not too far down. set minimum at 10 px below chart Y
    return Math.min(y + (chartY * .1), chartY - 10)
}

export const CustomLabel = ({ valueKey, x, y, height, payload}) => {
    const value = payload[valueKey]

    const yPos = calcY(y, height)

    return <text x={x} y={yPos} textAnchor="middle" fill="#666">{value}</text>
}

CustomLabel.propTypes = {
    valueKey: T.string,
    x: T.number,
    y: T.number,
    height: T.number,
    payload: T.object
}

const BookmarkActivityChart = ({ data, hideLabels }) => {
    return (<ResponsiveContainer>
        <AreaChart
            data={data}>
            <XAxis dataKey="week" padding={{ right: 20 }} />
            <YAxis padding={{ bottom: 1 }}
                tick={({ x, y, stroke, payload }) => {
                    //no tick mark at y 0
                    if (payload.value === 0) return null;

                    return <g>
                        <text x={x - 25} y={y + 5} fill="#666" >{payload.value}</text>
                    </g>
                }} />
            <Tooltip />
            <Area type="linear" dataKey="added" stackId="1" stroke="#8884d8" fill="#8884d8" label={!hideLabels && <CustomLabel valueKey="added" />} />
            <Area type="linear" dataKey="read" stackId="1" stroke="#ffc658" fill="#ffc658" label={!hideLabels && <CustomLabel valueKey="read" />} />
            <Area />
        </AreaChart>
    </ResponsiveContainer>)
}

BookmarkActivityChart.propTypes = {
    data: T.arrayOf(T.shape({
        week: T.string.isRequired,
        added: T.number.isRequired,
        read: T.number.isRequired
    })).isRequired,
    hideLabels: T.bool
}

export default BookmarkActivityChart
