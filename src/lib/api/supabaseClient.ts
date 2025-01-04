import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xrprohwntvoihmmafqoq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhycHJvaHdudHZvaWhtbWFmcW9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4NjA5NjYsImV4cCI6MjA1MTQzNjk2Nn0.uv9_DrYWGp4wEPhg3a6JB7wNeVTLAtFeLn1er7KiU6Q'; // Anonim API Anahtarını buraya ekleyin.

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
