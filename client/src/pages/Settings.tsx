import Sidebar from "../components/Sidebar/Sidebar";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { useRecords } from "../contexts/recordContext";

export default function Settings() {
    useAuthRedirect("", "/login");
    const { recordState } = useRecords();
    console.log("rs134142", recordState);
    return (
        <>
            <Sidebar />
            <main>Settings</main>
        </>
    );
}
