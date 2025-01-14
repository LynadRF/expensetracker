import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcrypt";

let db;

const lastYear: number = new Date().getFullYear() - 1;

export const getDb = async () => {
    db = await open({
        filename: "src/db/db.sqlite", // Specify the database file
        driver: sqlite3.Database,
    });
    return db;
};

export const initTables = async () => {
    const db = await getDb();

    try {
        await db.run(createUsersTableSql);
        await db.run(createRecordsTableSql);
    } catch (error) {
        console.error("Error creating db tables:", error);
    }
    await initDemoAccount();
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
    "user_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    PRIMARY KEY("id"),
    FOREIGN KEY (user_id) REFERENCES "users"("id")
);`;

const initDemoAccount = async () => {
    const db = await getDb();

    try {
        const demoUserPassword: string = await bcrypt.hash("demo", 10);
        const demoUserExists = await db.get("SELECT * FROM users where id = 0");
        const demoRecordsExists = await db.get("SELECT * FROM records where user_id = 0");

        if (!demoUserExists) {
            await db.run(createDemoUserSql, { ":password": demoUserPassword });
            console.log("Created DemoUser");
        }

        if (!demoRecordsExists) {
            await db.run(createDemoRecordsSql);
            console.log("Created DemoRecords");
        }
    } catch (error) {
        console.error("Error creating demoUser:", error);
    }
};

const createDemoUserSql = `INSERT INTO users (id, email, username, password, created_at) VALUES(0, 'demo@web.de', 'demo', :password, datetime('now'));`;

const createDemoRecordsSql = `INSERT INTO records (description, amount, category, user_id, created_at) VALUES
('January Rent', 1000, 'Rent', 0, '${lastYear}-01-01 10:00:00'),
('February Rent', 1000, 'Rent', 0, '${lastYear}-02-01 10:00:00'),
('March Rent', 1000, 'Rent', 0, '${lastYear}-03-01 10:00:00'),
('April Rent', 1000, 'Rent', 0, '${lastYear}-04-01 10:00:00'),
('May Rent', 1000, 'Rent', 0, '${lastYear}-05-01 10:00:00'),
('June Rent', 1000, 'Rent', 0, '${lastYear}-06-01 10:00:00'),
('July Rent', 1000, 'Rent', 0, '${lastYear}-07-01 10:00:00'),
('August Rent', 1000, 'Rent', 0, '${lastYear}-08-01 10:00:00'),
('September Rent', 1000, 'Rent', 0, '${lastYear}-09-01 10:00:00'),
('October Rent', 1000, 'Rent', 0, '${lastYear}-10-01 10:00:00'),
('November Rent', 1000, 'Rent', 0, '${lastYear}-11-01 10:00:00'),
('December Rent', 1000, 'Rent', 0, '${lastYear}-12-01 10:00:00'),

('January Utilities', 150, 'Utilities', 0, '${lastYear}-01-05 15:30:00'),
('February Utilities', 145, 'Utilities', 0, '${lastYear}-02-05 15:30:00'),
('March Utilities', 160, 'Utilities', 0, '${lastYear}-03-05 15:30:00'),
('April Utilities', 155, 'Utilities', 0, '${lastYear}-04-05 15:30:00'),
('May Utilities', 165, 'Utilities', 0, '${lastYear}-05-05 15:30:00'),
('June Utilities', 170, 'Utilities', 0, '${lastYear}-06-05 15:30:00'),
('July Utilities', 180, 'Utilities', 0, '${lastYear}-07-05 15:30:00'),
('August Utilities', 175, 'Utilities', 0, '${lastYear}-08-05 15:30:00'),
('September Utilities', 160, 'Utilities', 0, '${lastYear}-09-05 15:30:00'),
('October Utilities', 150, 'Utilities', 0, '${lastYear}-10-05 15:30:00'),
('November Utilities', 155, 'Utilities', 0, '${lastYear}-11-05 15:30:00'),
('December Utilities', 145, 'Utilities', 0, '${lastYear}-12-05 15:30:00'),

('Furniture', 600, 'Home', 0, '${lastYear}-01-10 14:45:00'),
('Decor', 120, 'Home', 0, '${lastYear}-03-12 16:20:00'),
('Repair', 250, 'Home', 0, '${lastYear}-06-25 18:50:00'),
('Appliances', 450, 'Home', 0, '${lastYear}-09-18 13:30:00'),
('Cleaning Supplies', 90, 'Home', 0, '${lastYear}-11-22 11:15:00'),

('Gas', 60, 'Transport', 0, '${lastYear}-01-15 08:20:00'),
('Taxi', 30, 'Transport', 0, '${lastYear}-03-09 22:00:00'),
('Public Transit', 50, 'Transport', 0, '${lastYear}-05-07 07:30:00'),
('Car Repair', 1500, 'Transport', 0, '${lastYear}-08-16 09:40:00'),
('Bike Maintenance', 45, 'Transport', 0, '${lastYear}-11-12 17:10:00'),

('Weekly Groceries', 150, 'Groceries', 0, '${lastYear}-01-08 12:00:00'),
('Weekly Groceries', 140, 'Groceries', 0, '${lastYear}-02-10 12:00:00'),
('Weekly Groceries', 155, 'Groceries', 0, '${lastYear}-04-05 12:00:00'),
('Special Ingredients', 60, 'Groceries', 0, '${lastYear}-06-12 12:00:00'),
('Holiday Groceries', 200, 'Groceries', 0, '${lastYear}-12-20 12:00:00'),

('Restaurant', 70, 'Dining', 0, '${lastYear}-01-22 19:00:00'),
('Coffee Shop', 15, 'Dining', 0, '${lastYear}-03-30 10:30:00'),
('Fast Food', 20, 'Dining', 0, '${lastYear}-05-15 13:15:00'),
('Dinner Date', 100, 'Dining', 0, '${lastYear}-08-20 20:00:00'),
('Lunch Outing', 40, 'Dining', 0, '${lastYear}-11-05 12:30:00'),

('Movie', 20, 'Leisure', 0, '${lastYear}-02-14 18:00:00'),
('Concert', 100, 'Leisure', 0, '${lastYear}-04-21 21:00:00'),
('Theme Park', 150, 'Leisure', 0, '${lastYear}-07-10 11:00:00'),
('Museum', 25, 'Leisure', 0, '${lastYear}-10-03 14:30:00'),
('Gaming Subscription', 15, 'Leisure', 0, '${lastYear}-12-01 12:00:00'),
('New gaming PC', 1750, 'Leisure', 0, '${lastYear}-09-01 12:00:00'),

('Vet Visit', 80, 'Pets', 0, '${lastYear}-02-02 09:15:00'),
('Pet Food', 50, 'Pets', 0, '${lastYear}-03-15 10:45:00'),
('Toys', 30, 'Pets', 0, '${lastYear}-05-18 14:00:00'),
('Grooming', 70, 'Pets', 0, '${lastYear}-08-25 16:00:00'),
('Pet Insurance', 25, 'Pets', 0, '${lastYear}-11-09 08:00:00'),

('Charity Donation', 100, 'Other', 0, '${lastYear}-01-20 12:00:00'),
('Electronics', 200, 'Other', 0, '${lastYear}-04-10 14:00:00'),
('Books', 50, 'Other', 0, '${lastYear}-06-15 16:30:00'),
('Subscription', 10, 'Other', 0, '${lastYear}-09-22 09:45:00'),
('Miscellaneous', 25, 'Other', 0, '${lastYear}-12-31 23:59:59'),
('Paying off a loan', 5000, 'Other', 0, '${lastYear}-05-31 23:59:59');`;
