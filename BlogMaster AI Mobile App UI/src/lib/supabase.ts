import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lpwfrelttlzicyecceao.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwd2ZyZWx0dGx6aWN5ZWNjZWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MzIxMzksImV4cCI6MjA3OTQwODEzOX0.TTH416iLDv6eJsj5xZBkHnQzHMyGzuwm1W3Bcc80Rec';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  purpose?: string;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string;
  user_id: string;
  title: string;
  content: string;
  tone: string;
  keywords: string[];
  word_count: number;
  status: 'Published' | 'Draft' | 'In Progress';
  created_at: string;
  updated_at: string;
}

export interface Template {
  id: string;
  user_id: string;
  name: string;
  tone: string;
  created_at: string;
}

