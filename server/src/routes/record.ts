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
            "insert into records (description, amount, category, userId, created_at) values (:description, :amount, :category, :userId, datetime('now'))",
            {
                ":description": data.description,
                ":amount": data.amount,
                ":category": data.category,
                ":userId": accountId,
            }
        );
        console.log("Created record:", insertion);
        res.status(201).send({ message: "CREATED_RECORD" });
        return;
    } catch (error) {
        console.error("Error inserting record:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }
});

record.get("/records", async (_req, res) => {
    const accountId: number = res.locals.id;

    const db: Database = await getDb();

    try {
        const selection = await db.all(
            "select description, amount, category, created_at from records where userId = :accountId order by created_at desc",
            { ":accountId": accountId }
        );
        res.status(200).send({ message: "FETCHED_ENTRIES", data: selection });
        return;
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }
});
