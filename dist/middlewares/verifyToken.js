"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../config/constants");
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
    if (!token) {
        res.status(403).json({ message: "Access denied, no token provided" });
        return;
    }
    jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ mesage: "Invalid or expired token" });
            return;
        }
        req.user = decoded;
        next();
    });
};
exports.verifyToken = verifyToken;
