import { RecordItem } from "../types/types";

export type RecordReducerAction =
    | { type: "UPDATE"; records: RecordItem[] }
    | { type: "ADD"; record: RecordItem }
    | { type: "DELETE"; recordId: number };

export function recordReducer(state: RecordItem[], action: RecordReducerAction): RecordItem[] {
    switch (action.type) {
        case "UPDATE":
            return action.records;
        case "ADD":
            return [action.record, ...state];
        case "DELETE":
            return state.filter((record) => record.id !== action.recordId);
        default:
            return state;
    }
}
