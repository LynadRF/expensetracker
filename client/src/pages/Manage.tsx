import Sidebar from "../components/Sidebar/Sidebar";
import RecordList from "../components/Manage/RecordList/RecordList";
import RecordEntry from "../components/Manage/RecordEntry/RecordEntry";
import Filter from "../components/Filter/Filter";

export default function Manage() {
    return (
        <>
            <Sidebar />
            <main>
                <h1>Management</h1>
                <RecordEntry />
                <Filter />
                <RecordList />
            </main>
        </>
    );
}
