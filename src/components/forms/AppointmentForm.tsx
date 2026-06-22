"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import {
  appointmentSchema,
  type AppointmentFormData,
} from "@/lib/validations/schemas";
import { SERVICE_OPTIONS } from "@/lib/constants";
import { SLOT_TAKEN_MESSAGE } from "@/lib/appointments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormState = "idle" | "loading" | "success" | "error";

export function AppointmentForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [copied, setCopied] = useState(false);
  const [slotTaken, setSlotTaken] = useState(false);
  const [checkingSlot, setCheckingSlot] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      message: "",
    },
  });

  const minDate = new Date().toISOString().split("T")[0];
  const watchedDate = useWatch({ control, name: "date" });
  const watchedTime = useWatch({ control, name: "time" });

  useEffect(() => {
    if (!watchedDate || !watchedTime) {
      setSlotTaken(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setCheckingSlot(true);
      try {
        const params = new URLSearchParams({
          date: watchedDate,
          time: watchedTime,
        });
        const response = await fetch(`/api/check-appointment-slot?${params}`, {
          signal: controller.signal,
        });
        const result = await response.json();
        if (response.ok) {
          setSlotTaken(result.available === false);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setSlotTaken(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setCheckingSlot(false);
        }
      }
    }, 400);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [watchedDate, watchedTime]);

  async function onSubmit(data: AppointmentFormData) {
    setFormState("loading");
    setErrorMessage("");

    try {
      const params = new URLSearchParams({ date: data.date, time: data.time });
      const availabilityResponse = await fetch(
        `/api/check-appointment-slot?${params}`
      );
      const availabilityResult = await availabilityResponse.json();

      if (
        availabilityResponse.ok &&
        availabilityResult.available === false
      ) {
        setSlotTaken(true);
        throw new Error(SLOT_TAKEN_MESSAGE);
      }

      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setBookingId(result.bookingId);
      setFormState("success");
      setSlotTaken(false);
      reset();
    } catch (err) {
      setFormState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  function copyBookingId() {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (formState === "success") {
    return (
      <div
        className="rounded-2xl border border-hope-200 bg-hope-50 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-hope-600 mb-4" aria-hidden="true" />
        <h3 className="font-display text-xl font-semibold text-hope-900">
          Appointment Request Received
        </h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for booking with Bright Hope. We will confirm your appointment shortly.
        </p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-xl bg-white border border-hope-200 px-6 py-3">
          <div className="text-left">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Booking ID
            </span>
            <p className="font-mono text-lg font-bold text-hope-700">{bookingId}</p>
          </div>
          <button
            type="button"
            onClick={copyBookingId}
            className="p-2 rounded-lg hover:bg-hope-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Copy booking ID"
          >
            {copied ? (
              <Check className="h-4 w-4 text-hope-600" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          A confirmation email has been sent to your inbox.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setFormState("idle");
            setBookingId("");
          }}
        >
          Book Another Appointment
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
      aria-label="Appointment booking form"
    >
      {formState === "error" && (
        <div
          className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
          role="alert"
        >
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="appt-name">Full Name *</Label>
          <Input
            id="appt-name"
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="appt-phone">Phone Number *</Label>
          <Input
            id="appt-phone"
            type="tel"
            placeholder="9962261841"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-destructive" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="appt-email">Email Address *</Label>
        <Input
          id="appt-email"
          type="email"
          placeholder="your@email.com"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">Service Type *</Label>
        <Controller
          name="service"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="service" aria-invalid={!!errors.service}>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.service && (
          <p className="text-sm text-destructive" role="alert">
            {errors.service.message}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="date">Preferred Date *</Label>
          <Input
            id="date"
            type="date"
            min={minDate}
            aria-invalid={!!errors.date || slotTaken}
            {...register("date")}
          />
          {errors.date && (
            <p className="text-sm text-destructive" role="alert">
              {errors.date.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Preferred Time *</Label>
          <Input
            id="time"
            type="time"
            min="09:00"
            max="18:00"
            aria-invalid={!!errors.time || slotTaken}
            {...register("time")}
          />
          {errors.time && (
            <p className="text-sm text-destructive" role="alert">
              {errors.time.message}
            </p>
          )}
          {checkingSlot && watchedDate && watchedTime && (
            <p className="text-sm text-muted-foreground">Checking availability...</p>
          )}
          {slotTaken && !errors.date && !errors.time && (
            <p className="text-sm text-destructive" role="alert">
              {SLOT_TAKEN_MESSAGE}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="appt-message">Message (Optional)</Label>
        <Textarea
          id="appt-message"
          placeholder="Any additional details..."
          rows={4}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-destructive" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
        {...register("website")}
      />

      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="w-full sm:w-auto"
        disabled={formState === "loading" || slotTaken || checkingSlot}
      >
        {formState === "loading" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Booking...
          </>
        ) : (
          "Book Appointment"
        )}
      </Button>
    </form>
  );
}
