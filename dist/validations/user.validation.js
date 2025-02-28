"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../config/constants");
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username is required"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    name: zod_1.z.string().min(1, "Name is required"),
    role: zod_1.z.enum([constants_1.Role.ADMIN, constants_1.Role.USER], { message: "Invalid role" }),
});
