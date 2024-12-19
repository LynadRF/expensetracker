import { RecordItem } from "../types/types";

export type RecordReducerAction = { type: "UPDATE"; records: RecordItem[] };

export function recordReducer(state: RecordItem[], action: RecordReducerAction): RecordItem[] {
    switch (action.type) {
        case "UPDATE":
            return action.records;
        default:
            return state;
    }
}
