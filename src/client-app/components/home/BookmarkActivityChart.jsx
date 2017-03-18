import React, { PropTypes as T } from 'react'
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import CustomLabel from './CustomBookmarkLabel'

const BookmarkActivityChart = ({ data }) => {
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
            <Area type="linear" dataKey="added" stackId="1" stroke="#8884d8" fill="#8884d8" label={<CustomLabel valueKey="added" />} />
            <Area type="linear" dataKey="read" stackId="1" stroke="#ffc658" fill="#ffc658" label={<CustomLabel valueKey="read" />} />
            <Area />
        </AreaChart>
    </ResponsiveContainer>)
}

BookmarkActivityChart.propTypes = {
    data: T.arrayOf(T.shape({
        week: T.string.isRequired,
        added: T.number.isRequired,
        read: T.number.isRequired
    })).isRequired
}

export default BookmarkActivityChart
