import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcrypt";

let db;

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

export const initDemoAccount = async () => {
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

const createDemoUserSql = `INSERT INTO users (id, email, username, password, created_at) VALUES(0, 'demo@web.de', 'demo', :password, date('now'));`;

const createDemoRecordsSql = `INSERT INTO records (description, amount, category, user_id, created_at) VALUES
('January Rent', 1200, 'Rent', 0, '2023-01-01'),
('February Rent', 1200, 'Rent', 0, '2023-02-01'),
('March Rent', 1200, 'Rent', 0, '2023-03-01'),
('April Rent', 1200, 'Rent', 0, '2023-04-01'),
('May Rent', 1200, 'Rent', 0, '2023-05-01'),
('June Rent', 1200, 'Rent', 0, '2023-06-01'),
('July Rent', 1200, 'Rent', 0, '2023-07-01'),
('August Rent', 1200, 'Rent', 0, '2023-08-01'),
('September Rent', 1200, 'Rent', 0, '2023-09-01'),
('October Rent', 1200, 'Rent', 0, '2023-10-01'),
('November Rent', 1200, 'Rent', 0, '2023-11-01'),
('December Rent', 1200, 'Rent', 0, '2023-12-01'),

('January Utilities', 150, 'Utilities', 0, '2023-01-05'),
('February Utilities', 145, 'Utilities', 0, '2023-02-05'),
('March Utilities', 160, 'Utilities', 0, '2023-03-05'),
('April Utilities', 155, 'Utilities', 0, '2023-04-05'),
('May Utilities', 165, 'Utilities', 0, '2023-05-05'),
('June Utilities', 170, 'Utilities', 0, '2023-06-05'),
('July Utilities', 180, 'Utilities', 0, '2023-07-05'),
('August Utilities', 175, 'Utilities', 0, '2023-08-05'),
('September Utilities', 160, 'Utilities', 0, '2023-09-05'),
('October Utilities', 150, 'Utilities', 0, '2023-10-05'),
('November Utilities', 155, 'Utilities', 0, '2023-11-05'),
('December Utilities', 145, 'Utilities', 0, '2023-12-05'),

('Furniture', 600, 'Home', 0, '2023-01-10'),
('Decor', 120, 'Home', 0, '2023-03-12'),
('Repair', 250, 'Home', 0, '2023-06-25'),
('Appliances', 450, 'Home', 0, '2023-09-18'),
('Cleaning Supplies', 90, 'Home', 0, '2023-11-22'),

('Gas', 60, 'Transport', 0, '2023-01-15'),
('Taxi', 30, 'Transport', 0, '2023-03-09'),
('Public Transit', 50, 'Transport', 0, '2023-05-07'),
('Car Repair', 350, 'Transport', 0, '2023-08-16'),
('Bike Maintenance', 45, 'Transport', 0, '2023-11-12'),

-- Groceries
('Weekly Groceries', 150, 'Groceries', 0, '2023-01-08'),
('Weekly Groceries', 140, 'Groceries', 0, '2023-02-10'),
('Weekly Groceries', 155, 'Groceries', 0, '2023-04-05'),
('Special Ingredients', 60, 'Groceries', 0, '2023-06-12'),
('Holiday Groceries', 200, 'Groceries', 0, '2023-12-20'),


('Restaurant', 70, 'Dining', 0, '2023-01-22'),
('Coffee Shop', 15, 'Dining', 0, '2023-03-30'),
('Fast Food', 20, 'Dining', 0, '2023-05-15'),
('Dinner Date', 100, 'Dining', 0, '2023-08-20'),
('Lunch Outing', 40, 'Dining', 0, '2023-11-05'),


('Movie', 20, 'Leisure', 0, '2023-02-14'),
('Concert', 100, 'Leisure', 0, '2023-04-21'),
('Theme Park', 150, 'Leisure', 0, '2023-07-10'),
('Museum', 25, 'Leisure', 0, '2023-10-03'),
('Gaming Subscription', 15, 'Leisure', 0, '2023-12-01'),


('Vet Visit', 80, 'Pets', 0, '2023-02-02'),
('Pet Food', 50, 'Pets', 0, '2023-03-15'),
('Toys', 30, 'Pets', 0, '2023-05-18'),
('Grooming', 70, 'Pets', 0, '2023-08-25'),
('Pet Insurance', 25, 'Pets', 0, '2023-11-09'),


('Charity Donation', 100, 'Other', 0, '2023-01-20'),
('Electronics', 200, 'Other', 0, '2023-04-10'),
('Books', 50, 'Other', 0, '2023-06-15'),
('Subscription', 10, 'Other', 0, '2023-09-22'),
('Miscellaneous', 25, 'Other', 0, '2023-12-31');`;
