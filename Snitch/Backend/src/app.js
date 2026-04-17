import config from "./config/config.js"
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20";


const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))

console.log(config.GOOGLE_CLIENT_ID)
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"

}, async (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Server is running" });
});

app.use("/api/auth", authRouter)



export default app;