import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db;

export const getDb = async () => {
    db = await open({
        filename: "src/db/db.sqlite", // Specify the database file
        driver: sqlite3.Database,
    });
    return db;
};
