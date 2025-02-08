import { createClient } from "@supabase/supabase-js";

export const supaBase = createClient(
    "https://myknsdwmgkaeejfzgvql.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15a25zZHdtZ2thZWVqZnpndnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NjUyNTIsImV4cCI6MjA1NDI0MTI1Mn0.boL55_2MC2jL5cYUtKzSIAZCfXHBdZcLnav7S1VRWec"
  );