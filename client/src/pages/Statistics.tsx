import Barplot from "../components/Charts/BarPlot";
import { parseRecord } from "../components/Charts/dataParsing";
import { useRecords } from "../hooks/useContextCustom";
import Sidebar from "../components/Sidebar/Sidebar";
import Lollipop from "../components/Charts/LollipopPlot";

export default function Statistics() {
    const { records } = useRecords();
    return (
        <>
            <Sidebar />
            <main>Graphs here</main>
        </>
    );
}
