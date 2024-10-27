import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecords } from "../hooks/useContextCustom";
import requestAPI from "../api";

export default function Records() {
    const { setRecords } = useRecords();

    useEffect(() => {
        const fetchRecords = async () => {
            const response = await requestAPI("GET", "/record/records");
            const result = await response.json();
            if (response.ok) setRecords(result.data);
        };
        fetchRecords();
    }, [setRecords]);

    return (
        <>
            <Outlet />
        </>
    );
}
