import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/client";
import { isAppointmentSlotAvailable } from "@/lib/appointments";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const time = searchParams.get("time");

    if (!date || !DATE_REGEX.test(date)) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    if (!time || !TIME_REGEX.test(time)) {
      return NextResponse.json({ error: "Invalid time" }, { status: 400 });
    }

    const supabase = createServerSupabase();
    const available = await isAppointmentSlotAvailable(supabase, date, time);

    return NextResponse.json({ available });
  } catch (error) {
    console.error("Check appointment slot error:", error);
    return NextResponse.json(
      { error: "Unable to verify appointment availability" },
      { status: 500 }
    );
  }
}
