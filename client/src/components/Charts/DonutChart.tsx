import { useMemo } from "react";
import * as d3 from "d3";
import { DataItem } from "./chartTypes";

const colors = [
    "#ff1c5d",
    "#625ad0",
    "#00344d",
    "#e7986d",
    "#54abaf",
    "#5b1915",
    "#adc16d",
    "#440583",
    "#77ce3f",
    "#ba689e",
    "#18d19b",
    "#e937a8",
    "#298837",
    "#bd3e33",
    "#878fb4",
];

type DonutChartProps = {
    width: number;
    height: number;
    margin?: number;
    data: DataItem[];
};

export default function DonutChart({ width, height, margin = 30, data }: DonutChartProps) {
    const radius = Math.min(width, height) / 2 - margin;

    const pie = useMemo(() => {
        const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
        return pieGenerator(data);
    }, [data]);

    const arcs = useMemo(() => {
        const arcPathGenerator = d3.arc();
        return pie.map(
            (p) =>
                arcPathGenerator({
                    innerRadius: 70,
                    outerRadius: radius,
                    startAngle: p.startAngle,
                    endAngle: p.endAngle,
                }) || undefined
        );
    }, [radius, pie]);

    return (
        <svg width={width} height={height} style={{ display: "inline-block" }}>
            <g transform={`translate(${width / 2}, ${height / 2})`}>
                {arcs.map((arc, i) => {
                    return <path key={i} d={arc} fill={colors[i]} />;
                })}
            </g>
        </svg>
    );
}
