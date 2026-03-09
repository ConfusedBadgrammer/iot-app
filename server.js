const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Error" });
});

app.use("/users");

app.listen(3000);
