import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { DataItem } from "../../../types/types";

type SimpleLineChartProps = {
    width: number;
    height: number;
    data: DataItem[];
};

export default function SimpleLineChart({ width, height, data }: SimpleLineChartProps) {
    return (
        <LineChart
            width={width}
            height={height}
            data={data}
            margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis dataKey="name" stroke="#f8f8f8" />
            <YAxis stroke="#8884d8" />
            <Tooltip itemStyle={{ color: "var(--color4)" }} />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 6 }} />
        </LineChart>
    );
}
