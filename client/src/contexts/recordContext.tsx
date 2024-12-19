import { createContext, useContext, useReducer, useState } from "react";
import { RecordFilterOptions, RecordSortOptions, DataItem, RecordItem } from "../types/types";
import { recordReducer, RecordReducerAction } from "../reducers/recordReducer";

function sortRecords(records: RecordItem[], sortOptions: RecordSortOptions): DataItem[] {
    const hashmap: Map<string, number> = new Map<string, number>();

    records.forEach((record) => {
        let key;
        switch (sortOptions.by) {
            case "category":
                key = record.category;
                break;
            case "month":
                key = record.created_at.split("-")[1];
                break;
            case "year":
                key = record.created_at.split("-")[0];
                break;
            default:
                key = record.category;
        }

        const currentValue: number = hashmap.get(key) || 0;
        hashmap.set(key, currentValue + record.amount);
    });

    const result: DataItem[] = [];

    hashmap.forEach((value, key) => {
        result.push({ name: key, value: value });
    });

    if (sortOptions.by === "month" || sortOptions.by === "year")
        result.sort((a, b) => parseInt(a.name, 10) - parseInt(b.name, 10));

    return result;
}

function filterRecords(records: RecordItem[], filterOptions: RecordFilterOptions): RecordItem[] {
    const result: RecordItem[] = [];

    if (!records || records.length === 0) return result;

    if (filterOptions?.amount) {
        for (let i = 0; i < filterOptions.amount; i++) {
            if (isDateInRange(filterOptions.from, filterOptions.to, records[i].created_at)) result.push(records[i]);
        }
    } else {
        records.forEach((record) => {
            if (isDateInRange(filterOptions.from, filterOptions.to, record.created_at)) result.push(record);
        });
    }

    return result;
}

// All dates should be of format YYYY-MM-DD
function isDateInRange(from: string, to: string, date: string): boolean {
    if (from.length !== 10 || to.length !== 10 || date.length !== 100) return false;

    const formattedFrom: string[] = from.split("-");
    const formattedTo: string[] = to.split("-");
    const formattedDate: string[] = date.split("-");

    for (let i = 0; i <= 2; i++) {
        if (formattedDate[i] < formattedFrom[i] || formattedDate[i] > formattedTo[i]) return false;
        if (formattedDate[i] > formattedFrom[i] && formattedDate[i] < formattedTo[i]) return true;
    }

    return true;
}

const RecordContext = createContext<{
    // recordReducer
    recordState: RecordItem[];
    recordDispatch: (recordDispatch: RecordReducerAction) => void;
    // others
    allRecordsState: RecordItem[];
    setAllRecordsState: React.Dispatch<React.SetStateAction<RecordItem[]>>;
    getFilteredRecords: (filterOptions: RecordFilterOptions, records?: RecordItem[]) => RecordItem[];
    getSortedRecords: (sortOptions: RecordSortOptions, records?: RecordItem[]) => DataItem[];
}>({
    // recordReducer
    recordState: [],
    recordDispatch: () => null,
    // others
    allRecordsState: [],
    setAllRecordsState: () => [],
    getFilteredRecords: () => [],
    getSortedRecords: () => [],
});

export function RecordContextProvider({ children }: RecordContextProviderProps) {
    const [recordState, recordDispatch] = useReducer(recordReducer, []);
    const [allRecordsState, setAllRecordsState] = useState<RecordItem[]>([]);

    const getFilteredRecords = (filterOptions: RecordFilterOptions, records?: RecordItem[]): RecordItem[] => {
        return filterRecords(records ? records : allRecordsState, filterOptions);
    };

    const getSortedRecords = (sortOptions: RecordSortOptions, records?: RecordItem[]): DataItem[] => {
        return sortRecords(records ? records : allRecordsState, sortOptions);
    };

    return (
        <RecordContext.Provider
            value={{
                allRecordsState,
                setAllRecordsState,
                recordState,
                recordDispatch,
                getFilteredRecords,
                getSortedRecords,
            }}
        >
            {children}
        </RecordContext.Provider>
    );
}

type RecordContextProviderProps = {
    children: JSX.Element;
};

export const useRecords = () => useContext(RecordContext);
