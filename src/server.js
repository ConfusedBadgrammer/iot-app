import express from "express";
import Router from "./routes/users.js";

const app = express();

app.use("/api/v1", Router);
app.listen(3000, () => console.log("Server running on port http://localhost:3000/api/v1/"));
