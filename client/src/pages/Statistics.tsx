import Sidebar from "../components/Sidebar/Sidebar";
import Barplot from "../components/Statistics/Charts/BarPlot";
import { parseRecord } from "../components/Statistics/Charts/dataParsing";
import { useRecords } from "../contexts/recordContext";
import useAuthRedirect from "../hooks/useAuthRedirect";

export default function Statistics() {
    useAuthRedirect("", "/login");
    const { recordState } = useRecords();
    return (
        <>
            <Sidebar />
            <main>
                <Barplot width={600} height={600} data={parseRecord(recordState)} />
            </main>
        </>
    );
}
