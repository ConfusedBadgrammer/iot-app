import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/readings/[device_id]/latest — fetch the most recent reading for a device
export async function GET(_, { params }) {
  const { device_id } = await params;

  const { data, error } = await supabase
    .from("sensor_readings")
    .select("temperature, humidity, co2, created_at")
    .eq("device_id", device_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
