import { Router } from "express";
import { createUser, getAllUser } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { userSchema } from "../validations/user.validation";
import { verifyToken } from "../middlewares/verifyToken";
import { authorize } from "../middlewares/authorize";

const router = Router();

router.get("/users", verifyToken, authorize(["ADMIN"]), getAllUser);
router.post(
    "/create",
    verifyToken,
    authorize(["ADMIN"]),
    validate(userSchema),
    createUser
);

export default router;
