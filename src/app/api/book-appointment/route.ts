import { NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/validations/schemas";
import { createServerSupabase } from "@/lib/supabase/client";
import {
  sendAppointmentNotification,
  sendAppointmentConfirmation,
} from "@/lib/email/resend";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { generateBookingId } from "@/lib/utils";
import { ALL_SERVICES } from "@/lib/constants";
import {
  isAppointmentSlotAvailable,
  isUniqueSlotViolation,
  SLOT_TAKEN_MESSAGE,
} from "@/lib/appointments";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(`appointment:${ip}`);

    if (!limit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ success: true, bookingId: "BH-SPAM" });
    }

    const parsed = appointmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid form data" },
        { status: 400 }
      );
    }

    const { name, email, phone, service, date, time, message } = parsed.data;
    const bookingId = generateBookingId();
    const serviceLabel =
      ALL_SERVICES.find((s) => s.id === service)?.title || service;

    const supabase = createServerSupabase();

    const slotAvailable = await isAppointmentSlotAvailable(supabase, date, time);
    if (!slotAvailable) {
      return NextResponse.json({ error: SLOT_TAKEN_MESSAGE }, { status: 409 });
    }

    const { error: dbError } = await supabase.from("appointments").insert({
      booking_id: bookingId,
      name,
      email,
      phone,
      service: serviceLabel,
      date,
      time,
      message: message || null,
      status: "pending",
    });

    if (dbError) {
      console.error("Database error:", dbError);
      if (isUniqueSlotViolation(dbError)) {
        return NextResponse.json({ error: SLOT_TAKEN_MESSAGE }, { status: 409 });
      }
      return NextResponse.json(
        { error: "Failed to save your appointment. Please try again." },
        { status: 500 }
      );
    }

    const [notifyResult, confirmResult] = await Promise.all([
      sendAppointmentNotification({
        bookingId,
        name,
        email,
        phone,
        service: serviceLabel,
        date,
        time,
        message: message || "",
      }),
      sendAppointmentConfirmation({
        bookingId,
        name,
        email,
        service: serviceLabel,
        date,
        time,
      }),
    ]);

    if (!notifyResult.success) {
      console.error("Email notification failed:", notifyResult.error);
    }

    if (!confirmResult.success) {
      console.error("Confirmation email failed:", confirmResult.error);
    }

    return NextResponse.json({ success: true, bookingId });
  } catch (error) {
    console.error("Appointment API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
