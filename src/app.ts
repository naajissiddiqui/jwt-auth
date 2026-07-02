import express from "express";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("JWT Auth api is running");
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

export default app;