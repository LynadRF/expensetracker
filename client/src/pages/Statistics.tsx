import { useState } from "react";
import Filter from "../components/Filter/Filter";
import Sidebar from "../components/Sidebar/Sidebar";
import { useRecords } from "../contexts/recordContext";
import useWindowDimensions from "../hooks/useWindowDimensions";
import SimpleLineChart from "../components/Statistics/Charts/SimpleLineChart";
import { RecordSortOptions } from "../types/types";
import SimpleBarChart from "../components/Statistics/Charts/SimpleBarChart";
import "../styles/Statistics.css";

type SortProps = {
    setSort: React.Dispatch<React.SetStateAction<RecordSortOptions>>;
};

function Sort({ setSort }: SortProps) {
    return (
        <div className="sort-container">
            <div>Sort by:</div>
            <div className="sort-child">
                <button className="sort-btn" onClick={() => setSort({ by: "month" })}>
                    Month
                </button>
            </div>
            <div className="sort-child">
                <button className="sort-btn" onClick={() => setSort({ by: "year" })}>
                    Year
                </button>
            </div>
            <div className="sort-child">
                <button className="sort-btn" onClick={() => setSort({ by: "category" })}>
                    Category
                </button>
            </div>
        </div>
    );
}

export default function Statistics() {
    const { recordState, getSortedRecords } = useRecords();
    const { height, width } = useWindowDimensions();
    const [plot, setPlot] = useState<string>("barchart");
    const [sort, setSort] = useState<RecordSortOptions>({ by: "month" });
    const plotData = getSortedRecords(sort, recordState);

    const renderStatistics = (plot: string) => {
        switch (plot) {
            case "linechart":
                return <SimpleLineChart width={width * 0.8} height={height * 0.75} data={plotData} />;
            case "barchart":
                return <SimpleBarChart width={width * 0.8} height={height * 0.75} data={plotData} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Sidebar />
            <main>
                <div className="statistics-container"></div>
                <Filter />
                <Sort setSort={setSort} />
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
                <div className="charts-container">
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
