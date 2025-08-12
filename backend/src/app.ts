import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({
  path: "./.env",
});

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hi there");
});

export default app;
