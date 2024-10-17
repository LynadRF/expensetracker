import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const secretKey = process.env.ENCRYPTIONKEY || "verysecretkey!";

// This middleware function throws an error if a request with an invalid token is made.
// If the token is valid it creates a new token and sets it as a cookie (to refresh the 30min timer of the tokens)
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).send("NOT_AUTHORIZED");

    try {
        const decoded = jwt.verify(token, secretKey) as { id: string };
        const refreshedToken = jwt.sign({ id: decoded.id }, secretKey, { expiresIn: "30m" });

        res.cookie("jwt", refreshedToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 1800000),
        });

        res.locals.id = decoded.id;

        next();
    } catch (error) {
        res.status(401).send("NOT_AUTHORIZED");
    }
}
