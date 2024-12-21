import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecords } from "../contexts/recordContext";
import requestAPI from "../api";
import { Categories } from "../types/enums";
import useAuthRedirect from "../hooks/useAuthRedirect";

export default function ProtectedRoutes() {
    useAuthRedirect("", "/login");
    const { allRecordsState, allRecordsDispatch, recordState, recordDispatch } = useRecords();

    const categoriesLocalStorage = localStorage.getItem("custom-categories");

    useEffect(() => {
        const fetchRecords = async () => {
            const response = await requestAPI("POST", "/record/records");
            const result = await response.json();
            if (response.ok) {
                allRecordsDispatch({ type: "UPDATE", records: result.data });
                if (recordState.length === 0) recordDispatch({ type: "UPDATE", records: result.data });
            }
        };

        if (allRecordsState.length === 0) fetchRecords();

        // If the users cookies for "custom-categories" do not exist, then add all custom categories, that the user already has entries for, as a cookie
        if (!categoriesLocalStorage) {
            const customCategories: string[] = [];
            recordState
                .map((record) => record.category)
                .filter((category) => !Object.values(Categories).includes(category))
                .forEach((category) => {
                    customCategories.push(category);
                });

            if (customCategories && customCategories.length > 0)
                localStorage.setItem("custom-categories", JSON.stringify(customCategories));
        }
    }, [allRecordsState, allRecordsDispatch, recordState, recordDispatch, categoriesLocalStorage]);

    return <Outlet />;
}
