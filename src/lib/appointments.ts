import type { SupabaseClient } from "@supabase/supabase-js";

export const SLOT_TAKEN_MESSAGE =
  "This appointment slot is already reserved. Please choose another date or time.";

export async function isAppointmentSlotAvailable(
  supabase: SupabaseClient,
  date: string,
  time: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("appointments")
    .select("id")
    .eq("date", date)
    .eq("time", time)
    .neq("status", "cancelled")
    .limit(1);

  if (error) {
    console.error("Slot availability check error:", error);
    throw new Error("Unable to verify appointment availability");
  }

  return !data || data.length === 0;
}

export function isUniqueSlotViolation(error: { code?: string; message?: string }) {
  return (
    error.code === "23505" ||
    error.message?.includes("idx_appointments_active_slot") === true
  );
}
