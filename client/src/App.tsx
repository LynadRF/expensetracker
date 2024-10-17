import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [data, setData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3001/api/");
            const result = await response.json();
            console.log(response);
            console.log(result);
            if (response.ok) setData(result.message);
        };
        fetchData();
    });

    return <>{data}</>;
}

export default App;
