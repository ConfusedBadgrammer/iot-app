import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST /api/readings — insert a sensor reading
export async function POST(request) {
  const { temperature, humidity, co2, device_id } = await request.json();

  const reading = { temperature, humidity, device_id };
  if (co2 !== undefined) reading.co2 = co2;

  const { error } = await supabase.from("sensor_readings").insert([reading]);

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log({ temperature, humidity, co2, device_id });
  return new NextResponse(null, { status: 200 });
}
