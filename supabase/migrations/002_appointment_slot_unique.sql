-- Prevent duplicate active appointments for the same date and time
CREATE UNIQUE INDEX IF NOT EXISTS idx_appointments_active_slot
  ON appointments (date, time)
  WHERE status NOT IN ('cancelled');
