import { z } from "zod";

export const studentSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    nickName: z.string().min(1),
    age: z
        .number()
        .int()
        .positive()
        .max(100, { message: "Age must not exceed 100 years" }),
});
