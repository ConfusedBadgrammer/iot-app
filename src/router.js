import { Router } from "express";
import * as DBTest from "./utils/supabase.js";
import { SensorController } from "./controller/sensor.controller.js";

export class MainRouter {
  constructor() {
    this.router = Router();
    this.initialiseRoutes();
    this.sensorController = new SensorController();
  }

  initialiseRoutes() {
    this.router.get("/", (req, res) => {
      res.json({ message: "Welcome to the API" });
    });

    this.router.post("/test", (req, res) => {
      console.log(req.body);
      this.sensorController.testPost(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}
