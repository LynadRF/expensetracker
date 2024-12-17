import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DataItem } from "../../../types/types";

type SimpleBarChartProps = {
    width: number;
    height: number;
    data: DataItem[];
};

export default function SimpleBarChart({ width, height, data }: SimpleBarChartProps) {
    return (
        <BarChart
            width={width}
            height={height}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis stroke="#8884d8" />
            <Tooltip itemStyle={{ color: "var(--color4)" }} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
    );
}
