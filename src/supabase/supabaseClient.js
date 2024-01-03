import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ubgaioenvbnlnkpgtyml.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViZ2Fpb2VudmJubG5rcGd0eW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY2NTYwMzUsImV4cCI6MTk5MjIzMjAzNX0.IXa05mJtc4JOWtK95H4w4rZc7qBEJA_z30WQ4LcX80s";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
