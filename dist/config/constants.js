"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET environment variable!");
}
exports.JWT_SECRET = process.env.JWT_SECRET || "";
if (!exports.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing. Please set it in your .env file.");
}
