import Filter from "../components/Filter/Filter";
import Sidebar from "../components/Sidebar/Sidebar";
import Barplot from "../components/Statistics/Charts/BarPlot";
import { parseRecord } from "../utils/parseData";
import { useRecords } from "../contexts/recordContext";
import useAuthRedirect from "../hooks/useAuthRedirect";

export default function Statistics() {
    useAuthRedirect("", "/login");
    const { recordState } = useRecords();
    return (
        <>
            <Sidebar />
            <main>
                <h1>Statistics</h1>
                <Filter />
                <Barplot width={600} height={600} data={parseRecord(recordState)} />
            </main>
        </>
    );
}
