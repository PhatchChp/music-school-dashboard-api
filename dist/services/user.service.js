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
exports.userExists = exports.deleteUserById = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUser = void 0;
const prisma_1 = require("../config/prisma");
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.user.findMany({ orderBy: { id: "desc" } });
});
exports.getAllUser = getAllUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.user.findUnique({ where: { id } });
});
exports.getUserById = getUserById;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.user.create({ data });
});
exports.createUser = createUser;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.user.update({ where: { id }, data });
});
exports.updateUser = updateUser;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.user.delete({ where: { id } });
});
exports.deleteUserById = deleteUserById;
const userExists = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.user.findFirst({
        where: { username: data.username },
    });
});
exports.userExists = userExists;
