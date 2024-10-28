import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Manage from "./pages/Manage";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import Records from "./pages/Records";
import { RecordContextProvider } from "./contexts/recordContext";
import { UserContextProvider } from "./contexts/userContext";
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
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/settings" element={<Settings />} />

                            <Route path="/records" element={<Records />}>
                                <Route index element={<Manage />} />
                                <Route path="/records/manage" element={<Manage />} />
                                <Route path="/records/statistics" element={<Statistics />} />
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
