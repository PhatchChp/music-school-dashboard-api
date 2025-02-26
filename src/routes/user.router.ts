import { Router } from "express";
import { createUser, getAllUser } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { userSchema } from "../validations/user.validation";

const router = Router();

router.get("/users", getAllUser);
router.post("/create", validate(userSchema), createUser);

export default router;
