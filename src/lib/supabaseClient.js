
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wzaijobkksojqksvgmls.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6YWlqb2Jra3NvanFrc3ZnbWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3ODQ1NzAsImV4cCI6MjA2NDM2MDU3MH0.CGG1o2RK4coJ_fPDhKSJHh4fX8vDCKprY8yUqeFK3Xg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
