import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.router";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", userRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`🛰️ Server running on port ${PORT}`));
