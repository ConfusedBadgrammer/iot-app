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
    // Test routes
    this.router.get("/", (req, res) => {
      res.json({ message: "Welcome to the API" });
    });

    // Sensor routes
    this.router.post("/sensor", (req, res) => {
      console.log(req.body);
      this.sensorController.post(req, res);
    });

    this.router.get("/sensor/:device_id/", (req, res) => {
      console.log(req.params.device_id);
      this.sensorController.get(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}
