import { supabase } from "../supabase.js";

export class SensorController {
  async testPost(req, res) {
    const { temperature, humidity } = req.body;

    const { error } = await supabase.from("sensor_readings").insert([{ temperature, humidity }]);

    if (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }

    return res.sendStatus(200);
  }
}
