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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getAllStudent = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const studentService = __importStar(require("../services/student.service"));
const entityUtils_1 = require("../utils/entityUtils");
const errorHandler_1 = require("../middlewares/errorHandler");
exports.getAllStudent = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield studentService.getAllStudent();
    return res.status(200).json(students);
}));
exports.getStudentById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield studentService.getStudentById(Number(req.params.id));
    if (!student)
        throw new errorHandler_1.NotFoundError("Student not found");
    return res.status(200).json(student);
}));
exports.createStudent = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existed = yield studentService.isStudentExists(req.body);
    if (existed) {
        return res.status(409).json({ message: "Student already exists" });
    }
    const student = yield studentService.createStudent(req.body);
    return res.status(201).json(student);
}));
exports.updateStudent = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, entityUtils_1.ensureStudentExists)(Number(req.params.id));
    const nameExists = yield studentService.isStudentExists(req.body);
    if (nameExists)
        throw new errorHandler_1.ExistingError("Student already exists");
    const studentUpdated = yield studentService.updateStudent(Number(req.params.id), req.body);
    return res.status(200).json(studentUpdated);
}));
exports.deleteStudent = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, entityUtils_1.ensureStudentExists)(Number(req.params.id));
    const studentDeleted = yield studentService.deleteStudentById(Number(req.params.id));
    return res.status(200).json(studentDeleted);
}));
