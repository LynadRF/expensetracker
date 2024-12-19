export type RecordSortOptions = {
    by: "category" | "month" | "year";
};

export type RecordFilterOptions = {
    from: string;
    to: string;
    limit?: number;
};

export type RecordItem = {
    id: number;
    description: string;
    amount: number;
    category: string;
    created_at: string;
};

export type DataItem = {
    name: string;
    value: number;
};
