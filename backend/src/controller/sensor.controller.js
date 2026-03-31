import { supabase } from "../supabase.js";

export class SensorController {
  async post(req, res) {
    const { temperature, humidity, co2, device_id } = req.body;

    const reading = { temperature, humidity, device_id };
    if (co2 !== undefined) reading.co2 = co2;

    const { error } = await supabase.from("sensor_readings").insert([reading]);

    if (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }

    return res.sendStatus(200);
  }

  async get(req, res) {
    const { device_id } = req.params;
    const { from, to } = req.query;

    // Queries sensor table
    let readingsQuery = supabase
      .from("sensor_readings")
      .select("temperature, humidity, co2, created_at")
      .eq("device_id", device_id)
      .order("created_at", { ascending: false });

    if (from) readingsQuery = readingsQuery.gte("created_at", from);
    if (to) readingsQuery = readingsQuery.lte("created_at", to);

    // Queries device table
    let deviceQuery = supabase
      .from("device")
      .select("name, location, type, battery, last_posted")
      .eq("device_id", device_id)
      .single();

    const [
      { data: device, error: deviceError },
      { data: readings, error: readingsError },
    ] = await Promise.all([deviceQuery, readingsQuery]);

    if (deviceError || readingsError) {
      console.log(deviceError || readingsError);
      return res
        .status(500)
        .json({ error: (deviceError || readingsError).message });
    }

    return res.json({ device, readings });
  }
}
