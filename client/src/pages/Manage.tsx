import Sidebar from "../components/Sidebar/Sidebar";
import RecordList from "../components/Manage/RecordList/RecordList";
import RecordEntry from "../components/Manage/RecordEntry/RecordEntry";
import useAuthRedirect from "../hooks/useAuthRedirect";

export default function Manage() {
    useAuthRedirect("", "/login");
    return (
        <>
            <Sidebar />
            <main>
                <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                    <h1>Management</h1>
                    <RecordEntry />
                    <RecordList />
                </div>
            </main>
        </>
    );
}
