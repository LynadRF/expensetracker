import { createContext, useContext, useReducer } from "react";
import { RecordItem } from "../types/types";

type FormAction = { type: "UPDATE"; records: RecordItem[] };

export function recordReducer(state: RecordItem[], action: FormAction): RecordItem[] {
    switch (action.type) {
        case "UPDATE":
            return action.records;
        default:
            return state;
    }
}

const initialRecordState: RecordItem[] = [];

const RecordContext = createContext<{
    recordState: RecordItem[];
    recordDispatch: (recordDispatch: FormAction) => void;
}>({
    recordState: initialRecordState,
    recordDispatch: () => null,
});

export function RecordContextProvider({ children }: RecordContextProviderProps) {
    const [recordState, recordDispatch] = useReducer(recordReducer, initialRecordState);
    return <RecordContext.Provider value={{ recordState, recordDispatch }}>{children}</RecordContext.Provider>;
}

type RecordContextProviderProps = {
    children: JSX.Element;
};

export const useRecords = () => useContext(RecordContext);
