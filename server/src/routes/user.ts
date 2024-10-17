import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDb } from "../db/db";

const user = Router();
export default user;

const secretKey = process.env.ENCRYPTIONKEY || "verysecretkey!";

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

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

    const db = await getDb();

    const user = await db.get("select * from users where email = :email", { ":email": email });

    if (user) {
        res.status(400).send({ error: "EMAIL_USED" });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
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
            expiresIn: "30m",
        });

        res.locals.id = user.id;

        res.cookie("jwt", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1800000),
        });

        res.status(200).send({ message: "LOGIN && TOKEN_SET" });
        return;
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send({ error: "INTERNAL_SERVER_ERROR" });
        return;
    }
});
