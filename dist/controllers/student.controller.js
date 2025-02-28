"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudent = exports.createStudent = exports.getAllStudent = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const prisma_1 = require("../config/prisma");
exports.getAllStudent = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield prisma_1.prisma.student.findMany({
        orderBy: { id: "desc" },
    });
    res.status(200).json({ students });
}));
exports.createStudent = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, nickName, age } = req.body;
    const student = yield prisma_1.prisma.student.create({
        data: { firstName, lastName, nickName, age },
    });
    res.status(201).json({ student });
}));
exports.updateStudent = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { firstName, lastName, nickName, age } = req.body;
    const studentUpdated = yield prisma_1.prisma.student.update({
        where: { id: Number(id) },
        data: { firstName, lastName, nickName, age },
    });
    res.status(200).json({ studentUpdated });
}));
