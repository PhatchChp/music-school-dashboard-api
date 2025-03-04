import { z } from "zod";
import { Role } from "../config/constants";

export const userSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().min(1, "Name is required"),
    role: z.enum([Role.ADMIN, Role.USER], { message: "Invalid role" }),
});

export const userExistsSchema = z.object({
    username: z.string().min(1, "Username is required"),
});
