import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecords } from "../contexts/recordContext";
import requestAPI from "../api";

export default function Records() {
    const { recordState, recordDispatch } = useRecords();

    useEffect(() => {
        const fetchRecords = async () => {
            const response = await requestAPI("GET", "/record/records");
            const result = await response.json();
            if (response.ok) recordDispatch({ type: "UPDATE", records: result.data });
        };
        if (recordState.length === 0) fetchRecords();
    }, [recordState, recordDispatch]);

    return (
        <>
            <Outlet />
        </>
    );
}
