import { createClient } from "@supabase/supabase-js";


const supabaseUrl = 'https://yreqwxgymltdrkksqxda.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZXF3eGd5bWx0ZHJra3NxeGRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNjU0MDAsImV4cCI6MjA1NDk0MTQwMH0.ZDwZ55gslCSSAEZevLD34GOCnhnBMOmckigpCci_rvY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
