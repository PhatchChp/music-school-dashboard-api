"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.checkUserExists = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUser = void 0;
const entityUtils_1 = require("./../utils/entityUtils");
const asyncHandler_1 = require("./../utils/asyncHandler");
const userService = __importStar(require("../services/user.service"));
const fomatUser_1 = require("../utils/fomatUser");
const bcrypt_1 = __importDefault(require("bcrypt"));
const errorHandler_1 = require("../middlewares/errorHandler");
const constants_1 = require("../config/constants");
exports.getAllUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const itemsPerpage = parseInt(req.query.limit) || 10;
    const search = String(req.query.search || "");
    const role = Object.values(constants_1.Role).includes(req.query.role)
        ? req.query.role
        : undefined;
    const { users, totalItem } = yield userService.getAllUser(page, itemsPerpage, search, role);
    const userResponse = users.map((user) => (0, fomatUser_1.toUserResponse)(user));
    return res.status(200).json({
        page,
        itemsPerpage,
        totalItem,
        totalPage: Math.ceil(totalItem / itemsPerpage),
        users: userResponse,
    });
}));
exports.getUserById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getUserById(Number(req.params.id));
    if (!user)
        throw new errorHandler_1.NotFoundError("User not found");
    const userResponse = (0, fomatUser_1.toUserResponse)(user);
    return res.status(200).json(userResponse);
}));
exports.createUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userExisting = yield userService.isUserExists(req.body);
    if (userExisting)
        throw new errorHandler_1.ExistingError("User already exists");
    const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
    const userCreated = yield userService.createUser(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
    const userResponse = (0, fomatUser_1.toUserResponse)(userCreated);
    return res.status(201).json(userResponse);
}));
exports.updateUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, entityUtils_1.ensureUserExists)(Number(req.params.id));
    const usernameExists = yield userService.isUserExists(req.body);
    if (usernameExists)
        throw new errorHandler_1.ExistingError("Username already exists");
    const userUpdated = yield userService.updateUser(Number(req.params.id), req.body);
    const userResponse = (0, fomatUser_1.toUserResponse)(userUpdated);
    return res.status(200).json(userResponse);
}));
exports.deleteUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, entityUtils_1.ensureUserExists)(Number(req.params.id));
    const deletedUser = yield userService.deleteUserById(Number(req.params.id));
    return res.status(200).json(deletedUser);
}));
exports.checkUserExists = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userExisting = yield userService.isUserExists(req.body);
    if (userExisting)
        throw new errorHandler_1.ExistingError("Username already exists");
    return res.status(200).json({ exists: false });
}));
