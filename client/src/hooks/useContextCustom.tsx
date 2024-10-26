import { useContext } from "react";
import { RecordContext } from "../App";

export function useRecords() {
    const context = useContext(RecordContext);
    if (!context) {
        throw new Error("useRecords must be used within a RecordContext.Provider");
    }
    return context;
}