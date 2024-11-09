import { Link, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import useAuthRedirect from "../hooks/useAuthRedirect";
import AccountSettings from "../components/Settings/AccountSettings/AccountSettings";
import ApplicationSettings from "../components/Settings/ApplicationSettings/ApplicationSettings";
import "../styles/Settings.css";

export default function Settings() {
    useAuthRedirect("", "/login");

    return (
        <>
            <Sidebar />
            <main>
                <div className="settings-navigation">
                    <Link to={"/settings/account"} className="settings-navigation-link">
                        Account
                    </Link>
                    <Link to={"/settings/application"} className="settings-navigation-link">
                        Application
                    </Link>
                </div>
                <Routes>
                    <Route index element={<AccountSettings />} />
                    <Route path="/account" element={<AccountSettings />} />
                    <Route path="/application" element={<ApplicationSettings />} />
                </Routes>
            </main>
        </>
    );
}
