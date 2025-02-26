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
exports.createUser = exports.getAllUser = void 0;
const prisma_1 = require("../config/prisma");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.getAllUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_1.prisma.user.findMany({ orderBy: { id: "desc" } });
    res.status(200).json({ users });
}));
exports.createUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, name, role } = req.body;
    if (!username || !password || !name || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newUser = yield prisma_1.prisma.user.create({
        data: {
            username,
            password,
            name,
            role,
        },
    });
    res.status(201).json({ message: "Create User success!" });
}));
