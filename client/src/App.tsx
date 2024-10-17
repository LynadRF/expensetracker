import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [data, setData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3001/api/user/login", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ email: "danielfleischmann03@web.de", password: "1234" }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
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
