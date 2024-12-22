import { Router } from "express";
import { getDb } from "../db/db";
import { authenticateToken } from "../middleware";
import { Database } from "sqlite";

const record = Router();
export default record;

record.use(authenticateToken);

type Record = {
    description: string;
    amount: number;
    category: string;
};

record.post("/add", async (req, res) => {
    const accountId: number = res.locals.id;
    const data: Record = req.body;

    if (!data.description || !data.amount || !data.category) {
        res.status(400).send({ error: "MISSING_INFORMATION" });
        return;
    }

    const db: Database = await getDb();

    try {
        const insertion = await db.run(
            "insert into records (description, amount, category, user_id, created_at) values (:description, :amount, :category, :user_id, datetime('now'))",
            {
                ":description": data.description,
                ":amount": data.amount,
                ":category": data.category,
                ":user_id": accountId,
            }
        );
        console.log("Created record:", insertion);
        res.status(201).send({ message: "CREATED_RECORD", data: { id: insertion.lastID } });
        return;
    } catch (error) {
        console.error("Error inserting record:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }
});

record.post("/records", async (req, res) => {
    let filter = req.body;
    const accountId: number = res.locals.id;

    if (!filter.from) filter.from = "0000-01-01";
    if (!filter.to) filter.to = "9999-12-31";
    if (!filter.limit) filter.limit = 9999;

    const queryString: string =
        "select id, description, amount, category, created_at from records where user_id = :accountId and created_at >= DATE(:from) and created_at <= DATE(:to) order by created_at desc limit :limit";

    const db: Database = await getDb();

    try {
        const selection = await db.all(queryString, {
            ":accountId": accountId,
            ":from": filter.from,
            ":to": filter.to,
            ":limit": filter.limit,
        });
        res.status(200).send({ message: "FETCHED_ENTRIES", data: selection });
        return;
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }
});

record.get("/dashboard-stats", async (_req, res) => {
    const accountId: number = res.locals.id;

    const db: Database = await getDb();

    const expensesOverTimeQuery: string =
        "SELECT SUM(amount) as sum FROM records WHERE user_id = :accountId AND created_at >= DATETIME('now', :timeSpan)";

    const topFiveCategoryQuery: string =
        "SELECT category, SUM(amount) as sum FROM records WHERE records.user_id = :accountId GROUP BY category ORDER BY SUM(amount) DESC LIMIT 5;";

    const topFiveExpensesQuery: string =
        "SELECT description, amount FROM records WHERE records.user_id = :accountId ORDER BY amount DESC LIMIT 5;";

    try {
        const oneMonth = await db.get(expensesOverTimeQuery, {
            ":accountId": accountId,
            ":timeSpan": "-1 month",
        });

        const threeMonths = await db.get(expensesOverTimeQuery, {
            ":accountId": accountId,
            ":timeSpan": "-3 months",
        });

        const sixMonths = await db.get(expensesOverTimeQuery, {
            ":accountId": accountId,
            ":timeSpan": "-6 months",
        });

        const oneYear = await db.get(expensesOverTimeQuery, {
            ":accountId": accountId,
            ":timeSpan": "-1 year",
        });

        const topFiveCategories = await db.all(topFiveCategoryQuery, {
            ":accountId": accountId,
        });

        const topFiveExpenses = await db.all(topFiveExpensesQuery, {
            ":accountId": accountId,
        });

        const data = {
            oneMonth: oneMonth,
            threeMonths: threeMonths,
            sixMonths: sixMonths,
            oneYear: oneYear,
            topFiveCategories: topFiveCategories,
            topFiveExpenses: topFiveExpenses,
        };

        res.status(200).send({ message: "FETCHED DASHBOARD_STATS", data: data });
        return;
    } catch (error) {
        console.error("Error fetching dashboard statistics:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }
});

record.post("/edit", async (req, res) => {
    const { id, newDescription, newAmount, newCategory } = req.body;
    const accountId: number = res.locals.id;

    if (!id || !newDescription || !newAmount || !newCategory) {
        res.status(400).send({ error: "MISSING_INFORMATION" });
        return;
    }

    const db: Database = await getDb();

    try {
        const update = await db.run(
            "update records set description = :newDescription, amount = :newAmount, category = :newCategory where id = :id and user_id = :user_id",
            {
                ":newDescription": newDescription,
                ":newAmount": newAmount,
                ":newCategory": newCategory,
                ":id": id,
                ":user_id": accountId,
            }
        );
        console.log("Updated record:", update);
        res.status(200).send({ message: "UPDATED_RECORD" });
        return;
    } catch (error) {
        console.error("Error editing record:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }
});

record.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const accountId = res.locals.id;

    if (!id) {
        res.status(400).send({ error: "MISSING_INFORMATION" });
        return;
    }

    const db: Database = await getDb();

    try {
        const deletion = await db.run("delete from records where id = :id and user_id = :user_id", {
            ":id": id,
            ":user_id": accountId,
        });
        console.log("Deleted record:", deletion);
        res.status(200).send({ message: "DELETED_RECORD" });
        return;
    } catch (error) {
        console.error("Error deleting record:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }
});
