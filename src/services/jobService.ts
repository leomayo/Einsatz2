import { supabase, handleSupabaseError } from '@/lib/supabase';

// Types
export type Job = {
  id: number;
  title: string;
  description: string;
  companyId: number;
  location: string;
  hourlyRate: number;
  requiredSkills: string[];
  category: string;
  startDate: string;
  duration: string;
  status: 'open' | 'filled' | 'closed';
  createdAt: string;
};

// Convert database job to frontend job
function mapDatabaseJobToJob(dbJob: any): Job {
  return {
    id: dbJob.id,
    title: dbJob.title,
    description: dbJob.description,
    companyId: dbJob.company_id,
    location: dbJob.location,
    hourlyRate: dbJob.hourly_rate,
    requiredSkills: dbJob.required_skills || [],
    category: dbJob.category,
    startDate: dbJob.start_date,
    duration: dbJob.duration,
    status: dbJob.status,
    createdAt: dbJob.created_at,
  };
}

/**
 * Get all jobs
 */
export async function getAllJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data.map(mapDatabaseJobToJob);
  } catch (error) {
    const { message } = handleSupabaseError(error);
    throw new Error(message);
  }
}

/**
 * Get jobs by category
 */
export async function getJobsByCategory(category: string): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('category', category)
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data.map(mapDatabaseJobToJob);
  } catch (error) {
    const { message } = handleSupabaseError(error);
    throw new Error(message);
  }
}

/**
 * Get a single job by ID
 */
export async function getJobById(id: number): Promise<Job | null> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data ? mapDatabaseJobToJob(data) : null;
  } catch (error) {
    const { message } = handleSupabaseError(error);
    throw new Error(message);
  }
}

/**
 * Create a new job
 */
export async function createJob(job: Omit<Job, 'id' | 'createdAt'>): Promise<Job> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .insert({
        title: job.title,
        description: job.description,
        company_id: job.companyId,
        location: job.location,
        hourly_rate: job.hourlyRate,
        required_skills: job.requiredSkills,
        category: job.category,
        start_date: job.startDate,
        duration: job.duration,
        status: job.status,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return mapDatabaseJobToJob(data);
  } catch (error) {
    const { message } = handleSupabaseError(error);
    throw new Error(message);
  }
}

/**
 * Update a job's status
 */
export async function updateJobStatus(id: number, status: 'open' | 'filled' | 'closed'): Promise<void> {
  try {
    const { error } = await supabase
      .from('jobs')
      .update({ status })
      .eq('id', id);

    if (error) {
      throw error;
    }
  } catch (error) {
    const { message } = handleSupabaseError(error);
    throw new Error(message);
  }
}

/**
 * Get jobs by company ID
 */
export async function getJobsByCompany(companyId: number): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data.map(mapDatabaseJobToJob);
  } catch (error) {
    const { message } = handleSupabaseError(error);
    throw new Error(message);
  }
}

/**
 * Search jobs by location and category
 */
export async function searchJobs(
  location?: string,
  category?: string
): Promise<Job[]> {
  try {
    let query = supabase
      .from('jobs')
      .select('*')
      .eq('status', 'open');
    
    if (location) {
      query = query.ilike('location', `%${location}%`);
    }
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data.map(mapDatabaseJobToJob);
  } catch (error) {
    const { message } = handleSupabaseError(error);
    throw new Error(message);
  }
} 