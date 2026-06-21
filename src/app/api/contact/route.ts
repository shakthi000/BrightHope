import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/schemas";
import { createServerSupabase } from "@/lib/supabase/client";
import {
  sendContactNotification,
  sendContactConfirmation,
} from "@/lib/email/resend";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(`contact:${ip}`);

    if (!limit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid form data" },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = parsed.data;

    const supabase = createServerSupabase();
    const { error: dbError } = await supabase.from("contact_submissions").insert({
      name,
      email,
      phone,
      subject,
      message,
    });

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save your message. Please try again." },
        { status: 500 }
      );
    }

    const [notifyResult, confirmResult] = await Promise.all([
      sendContactNotification({ name, email, phone, subject, message }),
      sendContactConfirmation({ name, email }),
    ]);

    if (!notifyResult.success) {
      console.error("Email notification failed:", notifyResult.error);
    }

    if (!confirmResult.success) {
      console.error("Confirmation email failed:", confirmResult.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
