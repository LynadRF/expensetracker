import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { DataItem } from "../../../types/types";
import CustomTooltip from "../CustomTooltip";

type SimpleLineChartProps = {
    width: number;
    height: number;
    data: DataItem[];
};

export default function SimpleLineChart({ width, height, data }: SimpleLineChartProps) {
    const currency = localStorage.getItem("currency-symbol");
    return (
        <LineChart
            width={width}
            height={height}
            data={data}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis dataKey="name" stroke="#f8f8f8" />
            <YAxis stroke="var(--color1)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line name={`value in ${currency}`} type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 6 }} />
        </LineChart>
    );
}
