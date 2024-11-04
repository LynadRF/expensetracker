import Sidebar from "../components/Sidebar/Sidebar";
import useAuthRedirect from "../hooks/useAuthRedirect";

export default function Settings() {
    useAuthRedirect("", "/login");
    return (
        <>
            <Sidebar />
            <main>Settings</main>
        </>
    );
}
