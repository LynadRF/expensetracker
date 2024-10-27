import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecordItem } from "./types/types";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Manage from "./pages/Manage";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import Records from "./pages/Records";
import "./App.css";

type UserInfo = {
    email: string;
    username: string;
};

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

interface UserContextType {
    userInfo: UserInfo;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export const UserContext = createContext<UserContextType>({
    userInfo: { email: "", username: "" },
    setUserInfo: () => {
        throw new Error("setUserInfo function must be overridden in UserContext.Provider");
    },
});

function App() {
    function NotFound() {
        return <>404 Not Found</>;
    }

    const [records, setRecords] = useState<RecordItem[]>([]);
    const [userInfo, setUserInfo] = useState<UserInfo>({ email: "", username: "" });

    return (
        <>
            <UserContext.Provider value={{ userInfo, setUserInfo }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/settings" element={<Settings />} />

                        <Route
                            path="/records"
                            element={
                                <RecordContext.Provider value={{ records, setRecords }}>
                                    <Records />
                                </RecordContext.Provider>
                            }
                        >
                            <Route index element={<Manage />} />
                            <Route path="/records/manage" element={<Manage />} />
                            <Route path="/records/statistics" element={<Statistics />} />
                        </Route>

                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;
