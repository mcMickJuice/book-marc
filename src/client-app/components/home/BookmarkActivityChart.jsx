/* @flow */
import React from 'react';
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const calcY = (y, chartY) => {
    //push datapoints down below lines 
    //...but not too far down. set minimum at 10 px below chart Y
    return Math.min(y + (chartY * .1), chartY - 10)
}

export type CustomLabelProps = {
    valueKey?: string,
    x?: number,
    y?: number,
    height?: number,
    payload?: Object,
};

export const CustomLabel = (props: CustomLabelProps) => {
    const { valueKey, x, y, height, payload } = props;
    const value = payload[valueKey]

    const yPos = calcY(y, height)

    return <text x={x} y={yPos} textAnchor="middle" fill="#666">{value}</text>
}

export type BookmarkActivityChartProps = {
    data: Array<{
        week: string,
        added: number,
        read: number,
    }>,
    hideLabels?: boolean,
};

const BookmarkActivityChart = (props: BookmarkActivityChartProps) => {
    const { data, hideLabels } = props;
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
                }}
            />
            <Tooltip />
            <Area type="linear" dataKey="added" stackId="1" stroke="#47A8BD" fill="#47A8BD" label={!hideLabels && <CustomLabel valueKey="added" />} />
            <Area type="linear" dataKey="read" stackId="1" stroke="#F5E663" fill="#F5E663" label={!hideLabels && <CustomLabel valueKey="read" />} />
            <Area />
        </AreaChart>
    </ResponsiveContainer>
    )
}

export default BookmarkActivityChart
