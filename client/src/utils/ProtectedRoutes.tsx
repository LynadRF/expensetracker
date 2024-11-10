import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecords } from "../contexts/recordContext";
import requestAPI from "../api";
import { Categories } from "../types/enums";
import useAuthRedirect from "../hooks/useAuthRedirect";

export default function ProtectedRoutes() {
    useAuthRedirect("", "/login");
    const { recordState, recordDispatch } = useRecords();
    const categoriesLocalStorage = localStorage.getItem("custom-categories");

    useEffect(() => {
        const fetchRecords = async () => {
            const response = await requestAPI("POST", "/record/records");
            const result = await response.json();
            if (response.ok) recordDispatch({ type: "UPDATE", records: result.data });
        };

        if (recordState.length === 0) fetchRecords();

        if (!categoriesLocalStorage) {
            const customCategories: string[] = [];
            recordState
                .map((record) => record.category)
                .filter((category) => !Object.values(Categories).includes(category))
                .forEach((category) => {
                    console.log(category);
                    customCategories.push(category);
                });

            if (customCategories && customCategories.length > 0)
                localStorage.setItem("custom-categories", JSON.stringify(customCategories));
        }
    }, [recordState, recordDispatch, categoriesLocalStorage]);

    return <Outlet />;
}
