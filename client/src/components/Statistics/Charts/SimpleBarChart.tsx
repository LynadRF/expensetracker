import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { DataItem } from "../../../types/types";
import CustomTooltip from "../CustomTooltip";

type SimpleBarChartProps = {
    width: number;
    height: number;
    data: DataItem[];
};

export default function SimpleBarChart({ width, height, data }: SimpleBarChartProps) {
    const currency = localStorage.getItem("currency-symbol");
    return (
        <BarChart
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="var(--color1)" />
            <YAxis stroke="var(--color1)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
                name={`value in ${currency}`}
                dataKey="value"
                fill="#8884d8"
                background={{ fill: "transparent" }}
                activeBar={<Rectangle fill="var(--color_highlight_green)" stroke="blue" />}
            />
        </BarChart>
    );
}
