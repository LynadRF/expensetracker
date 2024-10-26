import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecordItem } from "./components/Charts/chartTypes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Manage from "./pages/Manage";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import My from "./pages/My";
import "./App.css";

interface RecordContextType {
    records: RecordItem[];
    setRecords: React.Dispatch<React.SetStateAction<RecordItem[]>>;
}

export const RecordContext = createContext<RecordContextType>({
    records: [],
    setRecords: () => {
        throw new Error("setRecords function must be overridden in RecordContext.Provider");
    },
});

function App() {
    function NotFound() {
        return <>404 Not Found</>;
    }

    const [records, setRecords] = useState<RecordItem[]>([]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/settings" element={<Settings />} />

                    <Route
                        path="/my"
                        element={
                            <RecordContext.Provider value={{ records, setRecords }}>
                                <My />
                            </RecordContext.Provider>
                        }
                    >
                        <Route index element={<Manage />} />
                        <Route path="/my/manage" element={<Manage />} />
                        <Route path="/my/statistics" element={<Statistics />} />
                    </Route>

                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
