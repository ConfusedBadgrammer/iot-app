import { supabase } from "../supabase.js";

export class SensorController {
  async post(req, res) {
    const { temperature, humidity, co2 } = req.body;

    const reading = {temperature, humidity};
    if (co2 !== undefined) reading.co2 = co2;

    const { error } = await supabase.from("sensor_readings").insert([ reading ]);

    if (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }

    return res.sendStatus(200);
  }


}
