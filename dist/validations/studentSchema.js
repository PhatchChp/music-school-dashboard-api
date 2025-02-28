"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSchema = void 0;
const zod_1 = require("zod");
exports.studentSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    nickName: zod_1.z.string().min(1),
    age: zod_1.z.number().int().positive(),
});
