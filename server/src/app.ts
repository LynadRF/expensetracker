import express, { Express } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import user from "./routes/user";
import record from "./routes/record";
import { initTables } from "./db/db";

dotenv.config();

const app: Express = express();

const clientUrl: string = process.env.CLIENT_URL || "http://localhost:3000";
const port: string = process.env.PORT || "3001";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);

app.use("/api/user", user);
app.use("/api/record", record);

// initTables(); // Run this the first time you start the server to create all necessary SQL tables

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
