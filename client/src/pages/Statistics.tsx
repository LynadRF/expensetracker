import Barplot from "../components/Statistics/Charts/BarPlot";
import { parseRecord } from "../components/Statistics/Charts/dataParsing";
import { useRecords } from "../hooks/useContextCustom";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Statistics() {
    const { records } = useRecords();
    return (
        <>
            <Sidebar />
            <main>
                <Barplot width={600} height={600} data={parseRecord(records)} />
            </main>
        </>
    );
}
