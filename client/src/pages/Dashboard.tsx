import Sidebar from "../components/Sidebar/Sidebar";
import { LineChart } from "../components/Statistics/Charts/LineChart";
import { useRecords } from "../contexts/recordContext";
import useWindowDimensions from "../hooks/useWindowDimensions";
import "../styles/Dashboard.css";
import { parseRecord } from "../utils/parseData";

const dummyData: { x: string; y: number }[] = [
    { x: "Jan", y: 500 },
    { x: "Feb", y: 600 },
    { x: "Mar", y: 700 },
    { x: "Apr", y: 400 },
    { x: "May", y: 500 },
];

export default function Dashboard() {
    const { recordState } = useRecords();
    const { height, width } = useWindowDimensions();
    return (
        <>
            <Sidebar />
            <main>
                <div className="dashboard-container">
                    <div>
                        <LineChart width={width * 0.3} height={height * 0.3} data={dummyData} />
                    </div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </div>
            </main>
        </>
    );
}
