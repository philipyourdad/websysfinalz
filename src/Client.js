import { createClient } from "@supabase/supabase-js";

const base_url = 'https://mlrreqemjmgqtzljexej.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1scnJlcWVtam1ncXR6bGpleGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwMjkxMDIsImV4cCI6MjAzMjYwNTEwMn0.0JpLhe2UbQxGuQAbZf_su02lHOgnNIJqgZPGnQovYhQ';
const supabase = createClient(base_url, key);

export default supabase;
