import { RecordItem, DataItem } from "../types/types";

export function parseRecord(data: RecordItem[]): DataItem[] {
    const hashmap: { [key: string]: number } = {};

    data.forEach((element) => {
        if (hashmap[element.category] === undefined) hashmap[element.category] = element.amount;
        else hashmap[element.category] = hashmap[element.category] + element.amount;
    });

    return Object.entries(hashmap).map(([key, value]) => ({ name: key, value }));
}

// This functions parses dates of these formats: YYYY or MM/YYYY or MM/YY or DD/MM/YY or DD/MM/YYYY
// to the format YYYY-MM-DD for use in SQL statements
export function parseDate(date: string, resolutionDate: "start" | "end" = "start"): string {
    const parts: string[] = date.split("/");
    date.replace("/", "-");

    switch (date.length) {
        case 4: // YYYY
            if (resolutionDate === "start") return date + "-01-01";
            else return date + "-12-31";
        case 5: // MM/YY
            if (resolutionDate === "start") return "20" + parts[1] + "-" + parts[0] + "-01";
            else return "20" + parts[1] + "-" + parts[0] + "-31";
        case 7: // MM/YYYY
            if (resolutionDate === "start") return parts[1] + "-" + parts[0] + "-01";
            else return parts[1] + "-" + parts[0] + "-31";
        case 8: // DD/MM/YY
            return "20" + parts[2] + "-" + parts[1] + "-" + parts[0];
        case 10: // DD/MM/YYYY
            return parts[2] + "-" + parts[1] + "-" + parts[0];
        default:
            return "";
    }
}
