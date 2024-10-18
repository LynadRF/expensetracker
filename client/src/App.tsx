import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "boxicons/css/boxicons.min.css";
import "./App.css";
import Manage from "./pages/Manage";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";

function App() {
    function NotFound() {
        return (
            <>
                <main>404 Not Found</main>
            </>
        );
    }
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/manage" element={<Manage />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
