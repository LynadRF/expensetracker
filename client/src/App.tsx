import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Manage from "./pages/Manage";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import Records from "./pages/Records";
import { RecordContextProvider } from "./contexts/recordContext";
import { UserContextProvider } from "./contexts/userContext";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import "./App.css";

function App() {
    function NotFound() {
        return <>404 Not Found</>;
    }

    return (
        <>
            <UserContextProvider>
                <RecordContextProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />

                            <Route element={<ProtectedRoutes />}>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/settings/*" element={<Settings />} />
                                <Route path="/records" element={<Records />}>
                                    <Route index element={<Manage />} />
                                    <Route path="/records/manage" element={<Manage />} />
                                    <Route path="/records/statistics" element={<Statistics />} />
                                </Route>
                            </Route>
                            <Route path="/*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </RecordContextProvider>
            </UserContextProvider>
        </>
    );
}

export default App;
