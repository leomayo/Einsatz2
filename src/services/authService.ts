import { supabase, handleSupabaseError } from '@/lib/supabase';

export type UserType = 'worker' | 'company';

export type SignUpData = {
  email: string;
  password: string;
  userType: UserType;
  name: string;
};

export type ProfileData = {
  id?: number;
  name: string;
  email: string;
  userType: UserType;
  // Worker-specific fields
  title?: string;
  hourlyRate?: number;
  location?: string;
  workRadius?: number;
  availableFrom?: string;
  tags?: string[];
  otherSkills?: string[];
  category?: string;
  // Company-specific fields
  contactPerson?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  industry?: string;
};

/**
 * Sign up a new user
 */
export async function signUp(data: SignUpData): Promise<{ user: any, error: any }> {
  try {
    // 1. Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          user_type: data.userType,
          name: data.name,
        },
      },
    });

    if (authError) throw authError;

    // 2. Create the profile in the appropriate table
    if (data.userType === 'worker') {
      const { error: profileError } = await supabase.from('workers').insert({
        name: data.name,
        title: '',  // Default empty values
        hourly_rate: 0,
        location: '',
        work_radius: 25,
        available_from: 'Nog niet beschikbaar',
        category: '',
        user_id: authData.user?.id,
      });

      if (profileError) throw profileError;
    } else {
      const { error: profileError } = await supabase.from('companies').insert({
        name: data.name,
        contact_person: data.name,
        email: data.email,
        city: '',
        industry: '',
        user_id: authData.user?.id,
      });

      if (profileError) throw profileError;
    }

    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { user: null, error };
  }
}

/**
 * Sign in an existing user
 */
export async function signIn(email: string, password: string): Promise<{ user: any, error: any }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { user: null, error };
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<{ error: any }> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error };
  }
}

/**
 * Get the current user
 */
export async function getCurrentUser(): Promise<{ user: any, error: any }> {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Get user error:', error);
    return { user: null, error };
  }
}

/**
 * Get the user type (worker or company) from user metadata
 */
export function getUserType(user: any): UserType | null {
  if (!user) return null;
  return user.user_metadata?.user_type || null;
}

/**
 * Get the profile for the current user
 */
export async function getUserProfile(): Promise<{ profile: ProfileData | null, error: any }> {
  try {
    const { user, error: userError } = await getCurrentUser();
    if (userError) throw userError;
    if (!user) return { profile: null, error: new Error('User not found') };

    const userType = getUserType(user);
    
    if (userType === 'worker') {
      const { data, error } = await supabase
        .from('workers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      return {
        profile: {
          id: data.id,
          name: data.name,
          email: user.email || '',
          userType: 'worker',
          title: data.title,
          hourlyRate: data.hourly_rate,
          location: data.location,
          workRadius: data.work_radius,
          availableFrom: data.available_from,
          tags: data.tags,
          otherSkills: data.other_skills,
          category: data.category,
        },
        error: null
      };
    } else if (userType === 'company') {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      return {
        profile: {
          id: data.id,
          name: data.name,
          email: user.email || '',
          userType: 'company',
          contactPerson: data.contact_person,
          phone: data.phone,
          address: data.address,
          city: data.city,
          postalCode: data.postal_code,
          industry: data.industry,
        },
        error: null
      };
    }

    return { profile: null, error: new Error('Invalid user type') };
  } catch (error) {
    console.error('Get profile error:', error);
    return { profile: null, error };
  }
}

/**
 * Update the profile for the current user
 */
export async function updateUserProfile(profile: ProfileData): Promise<{ success: boolean, error: any }> {
  try {
    const { user, error: userError } = await getCurrentUser();
    if (userError) throw userError;
    if (!user) return { success: false, error: new Error('User not found') };

    if (profile.userType === 'worker') {
      const { error } = await supabase
        .from('workers')
        .update({
          name: profile.name,
          title: profile.title,
          hourly_rate: profile.hourlyRate,
          location: profile.location,
          work_radius: profile.workRadius,
          available_from: profile.availableFrom,
          tags: profile.tags,
          other_skills: profile.otherSkills,
          category: profile.category,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;
    } else if (profile.userType === 'company') {
      const { error } = await supabase
        .from('companies')
        .update({
          name: profile.name,
          contact_person: profile.contactPerson,
          phone: profile.phone,
          address: profile.address,
          city: profile.city,
          postal_code: profile.postalCode,
          industry: profile.industry,
        })
        .eq('user_id', user.id);

      if (error) throw error;
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, error };
  }
} 