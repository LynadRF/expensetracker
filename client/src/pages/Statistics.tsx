import { useState } from "react";
import Filter from "../components/Filter/Filter";
import Sidebar from "../components/Sidebar/Sidebar";
import { useRecords } from "../contexts/recordContext";
import useWindowDimensions from "../hooks/useWindowDimensions";
import SimpleLineChart from "../components/Statistics/Charts/SimpleLineChart";
import { RecordSortOptions } from "../types/types";
import SimpleBarChart from "../components/Statistics/Charts/SimpleBarChart";
import "../styles/Statistics.css";

export default function Statistics() {
    const { recordState, getFilteredRecords, getSortedRecords } = useRecords();
    const { height, width } = useWindowDimensions();
    const [plot, setPlot] = useState("barchart");
    const [sort, setSort] = useState<RecordSortOptions>({ by: "month" });
    const plotData = getSortedRecords(sort, getFilteredRecords({ from: "01/2023", to: "12/2024" }));

    const renderStatistics = (plot: string) => {
        switch (plot) {
            case "linechart":
                return <SimpleLineChart width={width * 0.8} height={height * 0.7} data={plotData} />;
            case "barchart":
                return <SimpleBarChart width={width * 0.8} height={height * 0.7} data={plotData} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Sidebar />
            <main>
                <h1>Statistics</h1>
                <Filter />
                <div className="statistics-filter-container">
                    <button
                        className="statistics-filter-btn"
                        onClick={() => {
                            setPlot("linechart");
                        }}
                    >
                        LineChart
                    </button>
                    <button
                        className="statistics-filter-btn"
                        onClick={() => {
                            setPlot("barchart");
                        }}
                    >
                        BarChart
                    </button>
                </div>
                <div className="statistics-container">
                    {recordState.length === 0 ? (
                        <h2 style={{ marginTop: "5vh", padding: "0px 2vw" }}>
                            No data selected! (Try checking your filters)
                        </h2>
                    ) : (
                        renderStatistics(plot)
                    )}
                </div>
            </main>
        </>
    );
}
