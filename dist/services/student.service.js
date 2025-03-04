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
exports.isStudentExists = exports.deleteStudentById = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getAllStudent = void 0;
const prisma_1 = require("../config/prisma");
const getAllStudent = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.student.findMany({ orderBy: { id: "desc" } });
});
exports.getAllStudent = getAllStudent;
const getStudentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.student.findUnique({ where: { id } });
});
exports.getStudentById = getStudentById;
const createStudent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.student.create({ data });
});
exports.createStudent = createStudent;
const updateStudent = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.student.update({ where: { id }, data });
});
exports.updateStudent = updateStudent;
const deleteStudentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.student.delete({ where: { id } });
});
exports.deleteStudentById = deleteStudentById;
const isStudentExists = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const studentExists = yield prisma_1.prisma.student.findFirst({
        where: {
            firstName: data.firstName,
            lastName: data.lastName,
            nickName: data.nickName,
        },
    });
    return !!studentExists; // ถ้ามี student -> true ถ้าไม่มี -> false
});
exports.isStudentExists = isStudentExists;
