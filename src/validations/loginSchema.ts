import { Request, Response } from "express";
import { z } from "zod";

export const loginSchema = z.object({
    username: z.string(),
    pasword: z.string(),
});
