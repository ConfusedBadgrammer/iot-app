import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/devices/[device_id] — fetch device info and sensor readings
export async function GET(request, { params }) {
  const { device_id } = await params;
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  let readingsQuery = supabase
    .from("sensor_readings")
    .select("temperature, humidity, co2, created_at")
    .eq("device_id", device_id)
    .order("created_at", { ascending: false });

  if (from) readingsQuery = readingsQuery.gte("created_at", from);
  if (to) readingsQuery = readingsQuery.lte("created_at", to);

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
    return NextResponse.json(
      { error: (deviceError || readingsError).message },
      { status: 500 },
    );
  }

  return NextResponse.json({ device, readings });
}
