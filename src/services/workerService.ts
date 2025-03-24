import { supabase, handleSupabaseError } from '@/lib/supabase';

// Types
export type Worker = {
  id: number;
  name: string;
  title: string;
  hourlyRate: number;
  rating: number;
  reviews: number;
  location: string;
  workRadius: number;
  availableFrom: string;
  tags: string[];
  otherSkills: string[];
  category: string;
};

// Convert database worker to frontend worker
function mapDatabaseWorkerToWorker(dbWorker: any): Worker {
  return {
    id: dbWorker.id,
    name: dbWorker.name,
    title: dbWorker.title,
    hourlyRate: dbWorker.hourly_rate,
    rating: dbWorker.rating,
    reviews: dbWorker.reviews,
    location: dbWorker.location,
    workRadius: dbWorker.work_radius,
    availableFrom: dbWorker.available_from,
    tags: dbWorker.tags || [],
    otherSkills: dbWorker.other_skills || [],
    category: dbWorker.category,
  };
}

/**
 * Get all workers
 */
export async function getAllWorkers(): Promise<Worker[]> {
  try {
    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      throw error;
    }

    return data.map(mapDatabaseWorkerToWorker);
  } catch (error) {
    const { message } = handleSupabaseError(error);
    throw new Error(message);
  }
}

/**
 * Get workers by category
 */
export async function getWorkersByCategory(category: string): Promise<Worker[]> {
  try {
    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .eq('category', category)
      .order('id', { ascending: true });

    if (error) {
      throw error;
    }

    return data.map(mapDatabaseWorkerToWorker);
  } catch (error) {
    const { message } = handleSupabaseError(error);
    throw new Error(message);
  }
}

/**
 * Get a single worker by ID
 */
export async function getWorkerById(id: number): Promise<Worker | null> {
  try {
    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data ? mapDatabaseWorkerToWorker(data) : null;
  } catch (error) {
    const { message } = handleSupabaseError(error);
    throw new Error(message);
  }
}

/**
 * Search workers by location and radius
 */
export async function searchWorkersByLocation(
  location: string,
  radius: number,
  category?: string
): Promise<Worker[]> {
  try {
    // In a real app, this would use PostGIS or a similar spatial database feature
    // For this example, we'll just filter by the location string
    let query = supabase
      .from('workers')
      .select('*')
      .ilike('location', `%${location}%`);
    
    // Add category filter if provided
    if (category) {
      query = query.eq('category', category);
    }
    
    // Filter by radius
    // This is a simplification - in a real app, you would use spatial queries
    query = query.lte('work_radius', radius);
    
    const { data, error } = await query.order('id', { ascending: true });

    if (error) {
      throw error;
    }

    return data.map(mapDatabaseWorkerToWorker);
  } catch (error) {
    const { message } = handleSupabaseError(error);
    throw new Error(message);
  }
} 