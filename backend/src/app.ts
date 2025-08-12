import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDb from "./db/db";

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

connectToDb()
  .then(() => {
    console.log(`Database Connection is Successful can move further`);
  })
  .catch((err) => {
    console.log(
      `Couldn't Connect to the database due to ${err} can't move further`
    );
  });

app.get("/", (req, res) => {
  res.send("Hi there");
});

export default app;
