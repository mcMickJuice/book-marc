import React, { Component, PropTypes as T } from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts'

//either use color scale
const colorFunc = pct => {
    const diff = Math.abs(pct - 1);
    const hue = diff * 120;

    return `hsl(${hue}, 100%, 50%)`
}

// or ordinal color scale
const COLORS = []

const TagOverviewChart = ({data}) => {
        return (
            <ResponsiveContainer>
                <PieChart padding={{ right: '20', left: '20' }}>
                    <Tooltip />
                    <Pie data={data} label labelLine={false}>
                        {data.map((entry, index, all) => {
                            const total = all.map(d => d.value).reduce((acc, next) => acc + next);
                            const pct = entry.value / total
                           
                            return <Cell key={entry.name} fill={colorFunc(pct)} />
                        })}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        );
    }

TagOverviewChart.propTypes = {
    data: T.arrayOf(T.shape({
        name: T.string.isRequired,
        value: T.number.isRequired
    })).isRequired
}

export default TagOverviewChart;