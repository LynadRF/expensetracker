import { RecordItem, DataItem } from "./chartTypes";

export function parseRecord(data: RecordItem[]): DataItem[] {
    const hashmap: { [key: string]: number } = {};

    data.forEach((element) => {
        if (hashmap[element.category] === undefined) hashmap[element.category] = element.amount;
        else hashmap[element.category] = hashmap[element.category] + element.amount;
    });

    return Object.entries(hashmap).map(([key, value]) => ({ name: key, value }));
}
