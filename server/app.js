import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoute.js";
import cookieParser from "cookie-parser";
import uploadRoutes from "./src/routes/uploadRoute.js";
import chatRoutes from "./src/routes/chatRoute.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://rag-bot-front.onrender.com",
      "https://omniagent-ai-front.onrender.com"
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

export default app;
