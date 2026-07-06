import dotenv from "dotenv";
dotenv.config();

import express from "express";
import router from "./routes/userRouter.js";
import db from "./database/database.js";

const app = express();
app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.json({
    status: "Servidor funcionando!",
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
