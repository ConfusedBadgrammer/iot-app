import express from "express";
import { MainRouter } from "./router.js";
import { testDBConnection } from "./utils/supabase.js";
import "dotenv/config";

export class App {
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.setupRoutes();
  }

  setupRoutes() {
    const router = new MainRouter();
    this.app.use("/api/v1", router.getRouter());
    console.log("Routes Initialised");
  }

  async start() {
    const connection = await testDBConnection();

    if (connection) {
      this.app.listen(3000, () =>
        console.log(
          new Date().toLocaleTimeString() +
            ` - Server running on port http://localhost:${process.env.PORT}/api/v1/`
        )
      );
    } else {
      console.error("Exiting: could not connect to database.");
      process.exit(1);
    }
  }
}
