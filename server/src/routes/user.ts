import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDb } from "../db/db";
import { authenticateToken } from "../middleware";
import { Database } from "sqlite";

const user = Router();
export default user;

const secretKey: string = process.env.ENCRYPTIONKEY || "verysecretkey!";

const validateEmail = (email: string) => {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

user.get("/authenticate", authenticateToken, async (_req, res) => {
    const accountId: number = res.locals.id;

    const db: Database = await getDb();

    // This is necessary
    let data = { email: "", username: "", createdAt: "" };
    try {
        const user = await db.get("select * from users where id = :id", { ":id": accountId });
        data = { email: user.email, username: user.username, createdAt: user.created_at };
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }

    res.status(200).send({ message: "AUTHENTICATED", data: data });
});

user.post("/register", async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        res.status(400).send({ error: "MISSING_INFORMATION" });
        return;
    }

    if (!validateEmail(email)) {
        res.status(400).send({ error: "EMAIL_INVALID" });
        return;
    }

    const db: Database = await getDb();

    const user = await db.get("select * from users where email = :email", { ":email": email });

    if (user) {
        res.status(400).send({ error: "EMAIL_USED" });
        return;
    }

    try {
        const hashedPassword: string = await bcrypt.hash(password, 10);
        const insertion = await db.run(
            "insert into users (email, username, password, created_at) values (:email, :username, :password, datetime('now'))",
            {
                ":email": email,
                ":username": username,
                ":password": hashedPassword,
            }
        );
        console.log("Created user:", insertion);
        res.status(201).send({ message: "CREATED_USER", data: { email: email, username: username } });
        return;
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }
});

user.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send({ error: "MISSING_INFORMATION" });
        return;
    }

    if (!validateEmail(email)) {
        res.status(400).send({ error: "EMAIL_INVALID" });
        return;
    }

    const db = await getDb();

    const user = await db.get("select * from users where email = :email", { ":email": email });

    if (!user) {
        res.status(404).send({ error: "ACCOUNT_NOT_FOUND" });
        return;
    }

    try {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(400).send({ error: "PASSWORD_INCORRECT" });
            return;
        }

        const token = jwt.sign({ id: user.id }, secretKey, {
            expiresIn: "120m",
        });

        res.locals.id = user.id;

        res.cookie("jwt", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1800000),
        });

        res.status(200).send({
            message: "LOGIN && TOKEN_SET",
            data: { email: user.email, username: user.username, createdAt: user.created_at },
        });
        return;
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }
});

user.post("/change-email", authenticateToken, async (req, res) => {
    const accountId: number = res.locals.id;
    const { newEmail, password } = req.body;

    if (!newEmail) {
        res.status(400).send({ error: "MISSING_INFORMATION" });
        return;
    }

    if (!validateEmail(newEmail)) {
        res.status(400).send({ error: "INVALID_FORMAT" });
        return;
    }

    try {
        const db: Database = await getDb();

        const newEmailUsed = await db.get("select * from users where email = :newEmail", {
            ":newEmail": newEmail,
        });

        if (newEmailUsed) {
            res.status(400).send({ error: "EMAIL_USED" });
            return;
        }

        const user = await db.get("select password from users where id = :accountId", {
            ":accountId": accountId,
        });

        const matchPassword = await bcrypt.compare(password, user.password);

        console.log(matchPassword);
        if (!matchPassword) {
            res.status(400).send({ error: "PASSWORD_INCORRECT" });
            return;
        }

        const update = await db.run("update users set email = :newEmail where id = :accountId", {
            ":accountId": accountId,
            ":newEmail": newEmail,
        });

        res.status(200).send({ message: "EMAIL_UPDATED", data: newEmail });
        return;
    } catch (error) {
        console.error("Error changing email:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }
});

user.post("/change-username", authenticateToken, async (req, res) => {
    const accountId: number = res.locals.id;
    const { newUsername } = req.body;

    if (!newUsername) {
        res.status(400).send({ error: "MISSING_INFORMATION" });
        return;
    }

    try {
        const db: Database = await getDb();

        const update = db.run("update users set username = :newUsername where id = :accountId", {
            ":accountId": accountId,
            ":newUsername": newUsername,
        });

        res.status(200).send({ message: "USERNAME_UPDATED", data: newUsername });
        return;
    } catch (error) {
        console.error("Error changing username:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }
});

user.post("/change-password", authenticateToken, async (req, res) => {
    const accountId: number = res.locals.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        res.status(400).send({ error: "MISSING_INFORMATION" });
        return;
    }

    try {
        const db: Database = await getDb();

        const user = await db.get("select password from users where id = :accountId", {
            ":accountId": accountId,
        });

        const matchPassword = await bcrypt.compare(oldPassword, user.password);

        if (!matchPassword) {
            res.status(400).send({ error: "PASSWORD_INCORRECT" });
            return;
        }

        const hashedPassword: string = await bcrypt.hash(newPassword, 10);

        const update = await db.run("update users set password = :hashedPassword where id = :accountId", {
            ":hashedPassword": hashedPassword,
            ":accountId": accountId,
        });

        res.status(200).send({ message: "PASSWORD_UPDATED" });
        return;
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }
});

user.post("/logout", authenticateToken, async (_req, res) => {
    res.clearCookie("jwt");
    res.status(200).send({ message: "LOGGED_OUT" });
});

user.delete("/delete", authenticateToken, async (req, res) => {
    const accountId: number = res.locals.id;
    const { password } = req.body;

    if (!password) {
        res.status(400).send({ error: "MISSING_INFORMATION" });
        return;
    }

    try {
        const db: Database = await getDb();

        const user = await db.get("select password from users where id = :accountId", {
            ":accountId": accountId,
        });

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            res.status(400).send({ error: "PASSWORD_INCORRECT" });
            return;
        }

        const userDeletion = await db.run("delete from users where id = :accountId", {
            ":accountId": accountId,
        });

        const recordDeletion = await db.run("delete from records where user_id = :accountId", {
            ":accountId": accountId,
        });

        res.clearCookie("jwt");

        res.status(201).send({ message: "DELETED_USER" });
        return;
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }
});
