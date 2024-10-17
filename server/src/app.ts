import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();

const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: clientUrl,
        credentials: true,
    })
);

app.get("/api/", (req: Request, res: Response) => {
    res.status(200).send({ message: "Hello World!" });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
