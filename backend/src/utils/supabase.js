import { supabase } from "../supabase.js";

export const testDBConnection = async () => {
  const { error } = await supabase.from("test").select("*").limit(1);
  if (error) {
    console.error("Database connection failed:", error.message);
  } else {
    console.log("Database connected successfully");
  }
};
