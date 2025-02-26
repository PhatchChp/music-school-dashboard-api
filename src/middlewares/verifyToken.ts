import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config/constants";

interface DecodedToken extends JwtPayload {
    userId: string;
    username: string;
    role: "ADMIN" | "USER";
    tokenType: "access" | "refresh";
}

export interface AuthRequest extends Request {
    user?: DecodedToken;
}

export const verifyToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers["authorization"]?.split("Bearer ")[1];

    if (!token) {
        res.status(403).json({ message: "Access denied, no token provided" });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ mesage: "Invalid or expired token" });
            return;
        }
        req.user = decoded as DecodedToken;
        next();
    });
};
