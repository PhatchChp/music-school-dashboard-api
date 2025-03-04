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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const asyncHandler_1 = require("../utils/asyncHandler");
const prisma_1 = require("../config/prisma");
const constants_1 = require("../config/constants");
const fomatUser_1 = require("../utils/fomatUser");
exports.login = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield prisma_1.prisma.user.findUnique({
        where: { username },
    });
    if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
        return res
            .status(400)
            .json({ message: "Invalid username or password" });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.name, role: user.role }, constants_1.JWT_SECRET, { expiresIn: "4h" });
    const userResponse = (0, fomatUser_1.toUserResponse)(user);
    return res.status(200).json({
        message: "Login Success",
        token,
        user: userResponse,
    });
}));
