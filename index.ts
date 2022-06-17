import express, { json, urlencoded } from "express";
import cors from "cors";
import routes from "./src/routes/index";
import db from "./src/database/db";

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(port, async () => {
  await db.sync();
  console.log(`Server running on ${process.env.APP_URL}`);
});

app.get("/", (req, res) => {
  res.status(200).json({ Hello: "API" });
});

app.use("/", routes);
