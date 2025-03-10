"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validate_1 = require("../middlewares/validate");
const userSchema_1 = require("../validations/userSchema");
const verifyToken_1 = require("../middlewares/verifyToken");
const authorize_1 = require("../middlewares/authorize");
const constants_1 = require("../config/constants");
const router = (0, express_1.Router)();
router.get("/", verifyToken_1.verifyToken, (0, authorize_1.authorize)([constants_1.Role.ADMIN]), user_controller_1.getAllUser);
router.post("/create", verifyToken_1.verifyToken, (0, authorize_1.authorize)([constants_1.Role.ADMIN]), (0, validate_1.validate)(userSchema_1.userSchema), user_controller_1.createUser);
router.put("/update/:id", verifyToken_1.verifyToken, (0, authorize_1.authorize)([constants_1.Role.ADMIN]), (0, validate_1.validate)(userSchema_1.userSchema), user_controller_1.updateUser);
router.delete("/delete/:id", verifyToken_1.verifyToken, (0, authorize_1.authorize)([constants_1.Role.ADMIN]), user_controller_1.deleteUser);
router.post("/check", verifyToken_1.verifyToken, (0, authorize_1.authorize)([constants_1.Role.ADMIN]), (0, validate_1.validate)(userSchema_1.userExistsSchema), user_controller_1.checkUserExists);
exports.default = router;
