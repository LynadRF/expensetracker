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

const createUsersTableSql = `CREATE TABLE IF NOT EXISTS "users" (
	"id" INTEGER,
	"email"	TEXT NOT NULL UNIQUE,
	"username" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"created_at" TEXT NOT NULL,
	PRIMARY KEY("id")
);`;

const createRecordsTableSql = `CREATE TABLE IF NOT EXISTS "records" (
    "id" INTEGER,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    PRIMARY KEY("id"),
    FOREIGN KEY (userId) REFERENCES "users"("id")
);`;

export const initTables = async () => {
    const db = await getDb();

    try {
        db.run(createUsersTableSql);
        db.run(createRecordsTableSql);
    } catch (error) {
        console.error("Error creating db tables:", error);
    }
};
