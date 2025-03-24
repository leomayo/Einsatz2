import { createClient } from '@supabase/supabase-js';

// Type for Supabase database schema
export type Database = {
  public: {
    tables: {
      workers: {
        Row: {
          id: number;
          name: string;
          title: string;
          hourly_rate: number;
          rating: number;
          reviews: number;
          location: string;
          work_radius: number;
          available_from: string;
          tags: string[];
          other_skills: string[];
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          title: string;
          hourly_rate: number;
          rating?: number;
          reviews?: number;
          location: string;
          work_radius: number;
          available_from: string;
          tags?: string[];
          other_skills?: string[];
          category: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          title?: string;
          hourly_rate?: number;
          rating?: number;
          reviews?: number;
          location?: string;
          work_radius?: number;
          available_from?: string;
          tags?: string[];
          other_skills?: string[];
          category?: string;
          updated_at?: string;
        };
      };
      jobs: {
        Row: {
          id: number;
          title: string;
          description: string;
          company_id: number;
          location: string;
          hourly_rate: number;
          required_skills: string[];
          category: string;
          start_date: string;
          duration: string;
          status: 'open' | 'filled' | 'closed';
          created_at: string;
        };
        Insert: {
          title: string;
          description: string;
          company_id: number;
          location: string;
          hourly_rate: number;
          required_skills?: string[];
          category: string;
          start_date: string;
          duration: string;
          status?: 'open' | 'filled' | 'closed';
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          company_id?: number;
          location?: string;
          hourly_rate?: number;
          required_skills?: string[];
          category?: string;
          start_date?: string;
          duration?: string;
          status?: 'open' | 'filled' | 'closed';
        };
      };
      companies: {
        Row: {
          id: number;
          name: string;
          contact_person: string;
          email: string;
          phone: string;
          address: string;
          city: string;
          postal_code: string;
          industry: string;
          created_at: string;
        };
        Insert: {
          name: string;
          contact_person: string;
          email: string;
          phone: string;
          address: string;
          city: string;
          postal_code: string;
          industry: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          contact_person?: string;
          email?: string;
          phone?: string;
          address?: string;
          city?: string;
          postal_code?: string;
          industry?: string;
        };
      };
    };
  };
};

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function for handling Supabase errors
export function handleSupabaseError(error: any): { message: string; statusCode: number } {
  console.error('Supabase error:', error);
  
  // Default error
  let errorResponse = {
    message: 'An unexpected error occurred',
    statusCode: 500
  };

  // Handle specific error codes if needed
  if (error?.code === 'PGRST116') {
    errorResponse = {
      message: 'Resource not found',
      statusCode: 404
    };
  } else if (error?.code === '23505') {
    errorResponse = {
      message: 'A record with this information already exists',
      statusCode: 409
    };
  }

  return errorResponse;
} 