import Sidebar from "../components/Sidebar/Sidebar";
import RecordList from "../components/Manage/RecordList/RecordList";
import RecordEntry from "../components/Manage/RecordEntry/RecordEntry";
import Filter from "../components/Filter/Filter";
import { useRecords } from "../contexts/recordContext";

export default function Manage() {
    const { recordState } = useRecords();
    return (
        <>
            <Sidebar />
            <main>
                <div style={{ margin: "4vh 4vw 1vh 4vw" }}>
                    <RecordEntry />
                </div>
                <Filter />
                <RecordList records={recordState} />
            </main>
        </>
    );
}
