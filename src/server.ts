import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.router";
import loginRouter from "./routes/login.router";
import { errorHandler } from "./middlewares/errorHandler";
import studentRouter from "./routes/student.router";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/student", studentRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`🛰️ Server running on port ${PORT}`));
