import { useState } from "react";
import Filter from "../components/Filter/Filter";
import Sidebar from "../components/Sidebar/Sidebar";
import Barplot from "../components/Statistics/Charts/BarPlot";
import { parseRecord } from "../utils/parseData";
import { useRecords } from "../contexts/recordContext";
import useAuthRedirect from "../hooks/useAuthRedirect";
import useWindowDimensions from "../hooks/useWindowDimensions";
import DonutChart from "../components/Statistics/Charts/DonutChart";
import "../styles/Statistics.css";

export default function Statistics() {
    useAuthRedirect("", "/login");
    const { recordState } = useRecords();
    const { height, width } = useWindowDimensions();
    const [plot, setPlot] = useState("bar");

    const renderStatistics = (plot: string) => {
        switch (plot) {
            case "bar":
                return <Barplot width={width * 0.8} height={height * 0.7} data={parseRecord(recordState)} />;
            case "donut":
                return <DonutChart width={width * 0.8} height={height * 0.7} data={parseRecord(recordState)} />;
        }
    };

    return (
        <>
            <Sidebar />
            <main>
                <h2>Some charts may not work on mobile!</h2>
                <h1>Statistics</h1>
                <Filter />
                <div className="statistics-filter-container">
                    <button
                        className="statistics-filter-btn"
                        onClick={() => {
                            setPlot("bar");
                        }}
                    >
                        Barplot
                    </button>
                    <button
                        className="statistics-filter-btn"
                        onClick={() => {
                            setPlot("donut");
                        }}
                    >
                        DonutChart
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
