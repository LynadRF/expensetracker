import { createContext, useContext, useReducer } from "react";
import { RecordFilterOptions, RecordSortOptions, DataItem, RecordItem } from "../types/types";
import { parseDate } from "../utils/parseData";

type FormAction = { type: "UPDATE"; records: RecordItem[] };

export function recordReducer(state: RecordItem[], action: FormAction): RecordItem[] {
    switch (action.type) {
        case "UPDATE":
            return action.records;
        default:
            return state;
    }
}

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

function isDateInRange(from: string, to: string, unformattedDate: string): boolean {
    // formattedDates are of format YYYY/MM/DD => [0] === YYYY, [1] === MM, [2] === DD
    const formattedFrom: string[] = parseDate(from, "start").split("-");
    const formattedTo: string[] = parseDate(to, "end").split("-");
    const formattedDate: string[] = unformattedDate.slice(0, 10).split("-");

    /*
    for (let i = 0; i <= 2; i++) {
        if (formattedDate[i] < formattedFrom[i] || formattedDate[i] > formattedTo[i]) return false;
        if (formattedDate[i] > formattedFrom[i] && formattedDate[i] < formattedTo[i]) return true;
    }
    */

    if (formattedDate[0] < formattedFrom[0] || formattedDate[0] > formattedTo[0]) return false; // Year outside of year-range => always false
    if (formattedDate[0] > formattedFrom[0] && formattedDate[0] < formattedTo[0]) return true; // Year inside of year-range => always true no matter the month/day filter
    // All cases with fromYear === isYear === toYear
    if (formattedDate[1] < formattedFrom[1] || formattedDate[1] > formattedTo[1]) return false; // Month outside of month-range => always false
    if (formattedDate[1] > formattedFrom[1] && formattedDate[1] < formattedTo[1]) return true; // Month inside of month-range => always true no matter the day filter
    // All cases with fromMonth === isMonth === toMonth
    if (formattedDate[2] < formattedFrom[2] || formattedDate[2] > formattedTo[2]) return false; // Day outside of day-range => always false
    if (formattedDate[2] > formattedFrom[2] && formattedDate[2] < formattedTo[2]) return true; // Day inside of day-range => always true

    return true; // isDay === fromDay or isDay === toDay => we count it as true
}

const initialRecordState: RecordItem[] = [];

const RecordContext = createContext<{
    recordState: RecordItem[];
    recordDispatch: (recordDispatch: FormAction) => void;
    getFilteredRecords: (filterOptions: RecordFilterOptions, records?: RecordItem[]) => RecordItem[];
    getSortedRecords: (sortOptions: RecordSortOptions, records?: RecordItem[]) => DataItem[];
}>({
    recordState: initialRecordState,
    recordDispatch: () => null,
    getFilteredRecords: () => [],
    getSortedRecords: () => [],
});

export function RecordContextProvider({ children }: RecordContextProviderProps) {
    const [recordState, recordDispatch] = useReducer(recordReducer, initialRecordState);

    const getFilteredRecords = (filterOptions: RecordFilterOptions, records?: RecordItem[]): RecordItem[] => {
        return filterRecords(records ? records : recordState, filterOptions);
    };

    const getSortedRecords = (sortOptions: RecordSortOptions, records?: RecordItem[]): DataItem[] => {
        return sortRecords(records ? records : recordState, sortOptions);
    };

    return (
        <RecordContext.Provider value={{ recordState, recordDispatch, getFilteredRecords, getSortedRecords }}>
            {children}
        </RecordContext.Provider>
    );
}

type RecordContextProviderProps = {
    children: JSX.Element;
};

export const useRecords = () => useContext(RecordContext);
