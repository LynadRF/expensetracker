import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
const port = process.env.PORT || "3001";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: clientUrl,
        credentials: true,
    })
);

app.get("/api/test", (request: Request, response: Response) => {
    response.status(200).send({ message: "Hello World" });
});

app.listen(port, () => {
    console.log("Server running at PORT: ", port);
}).on("error", (error) => {
    throw new Error(error.message);
});
