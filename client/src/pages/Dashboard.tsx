import Sidebar from "../components/Sidebar/Sidebar";
import SimpleLineChart from "../components/Statistics/Charts/SimpleLineChart";
import { useRecords } from "../contexts/recordContext";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { DataItem, RecordFilterOptions, RecordSortOptions } from "../types/types";
import "../styles/Dashboard.css";

export default function Dashboard() {
    const { recordState, getSortedRecords } = useRecords();
    const { height, width } = useWindowDimensions();
    const today: Date = new Date();
    const lastYear: number = today.getFullYear() - 1;
    const sortOptions: RecordSortOptions = { by: "month" };
    const filterOptions: RecordFilterOptions = setDefaultFilterOptions();
    const chartData: DataItem[] = getSortedRecords(sortOptions, recordState);

    function setDefaultFilterOptions(): RecordFilterOptions {
        if (width > 980) {
            return { from: lastYear.toString(), to: lastYear.toString() };
        }
        if (width > 600) {
            let sixMonthsAgo = today.getMonth() - 6;
            if (sixMonthsAgo <= 0) {
                sixMonthsAgo += 12;
                return { from: sixMonthsAgo + "/" + lastYear, to: today.getMonth() + "/" + today.getFullYear() };
            }
            return {
                from: sixMonthsAgo + "/" + today.getFullYear(),
                to: today.getMonth() + "/" + today.getFullYear(),
            };
        }
        let threeMonthsAgo = today.getMonth() - 3;
        if (threeMonthsAgo <= 0) {
            threeMonthsAgo += 12;
            return { from: threeMonthsAgo + "/" + lastYear, to: today.getMonth() + "/" + today.getFullYear() };
        }
        return {
            from: threeMonthsAgo + "/" + today.getFullYear(),
            to: today.getMonth() + "/" + today.getFullYear(),
        };
    }

    return (
        <>
            <Sidebar />
            <main>
                <div className="dashboard-container">
                    <div>
                        {!chartData || chartData.length === 0 ? (
                            <h4>No recent data to display</h4>
                        ) : (
                            <>
                                <h4>
                                    {filterOptions.from === filterOptions.to ? (
                                        <>Expenses of {filterOptions.from}</>
                                    ) : (
                                        <>
                                            Expenses from {filterOptions.from} to {filterOptions.to}
                                        </>
                                    )}
                                </h4>
                                <SimpleLineChart width={width * 0.8} height={height * 0.5} data={chartData} />
                            </>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
