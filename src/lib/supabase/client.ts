import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;
let serverSupabaseInstance: SupabaseClient | null = null;

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || "";
}

function getSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
}

export function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      getSupabaseUrl(),
      getSupabaseAnonKey()
    );
  }
  return supabaseInstance;
}

export function createServerSupabase() {
  if (!serverSupabaseInstance) {
    serverSupabaseInstance = createClient(
      getSupabaseUrl(),
      process.env.SUPABASE_SERVICE_ROLE_KEY || getSupabaseAnonKey(),
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }
  return serverSupabaseInstance;
}

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string | null;
  message: string;
  created_at: string;
};

export type Appointment = {
  id: string;
  booking_id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string | null;
  status: string;
  created_at: string;
};
