import authRouter from "./routes/auth.route.js";
import chatRouter from "./routes/chat.route.js";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app= express();
app.use(morgan("dev"));

app.use(cors({
    origin:"http://localhost:5173",

    credentials:true
    
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

export default app;