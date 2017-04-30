/* @flow */
import React, { PropTypes as T } from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts'


// or ordinal color scale
const COLORS = ['#1E3888', '#47A8BD', '#F5E663', '#FFAD69', '#9C3848']

export type Props = { data: Array<{
    name: string,
    value: number,
}> };

const TagOverviewChart = (props: Props) => {
    const {data} = props;
    return (
        <ResponsiveContainer>
            <PieChart padding={{ right: '20', left: '20' }}>
                <Tooltip />
                <Pie data={data} label labelLine={false}>
                    {data.map((entry, index, all) => {
                        const total = all.map(d => d.value).reduce((acc, next) => acc + next);
                        const pct = entry.value / total
                       
                        return <Cell key={entry.name} fill={COLORS[index % 5]} />
                    })}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

export default TagOverviewChart;