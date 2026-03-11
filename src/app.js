import express from "express";

export class App {
  constructor() {
    this.app = express();
  }

  setupRoutes() {}

  start() {
    app.listen(3000, () => console.log("Server running on port http://localhost:3000/api/v1/"));
  }
}
