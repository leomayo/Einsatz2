-- Workers table
CREATE TABLE IF NOT EXISTS workers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  hourly_rate DECIMAL(10, 2) NOT NULL,
  rating DECIMAL(3, 2) DEFAULT 0.0,
  reviews INTEGER DEFAULT 0,
  location TEXT NOT NULL,
  work_radius INTEGER NOT NULL DEFAULT 25,
  available_from TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  other_skills TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  profile_image_url TEXT,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add to realtime publication for realtime updates
ALTER PUBLICATION supabase_realtime ADD TABLE workers;

-- Enable Row Level Security
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for workers table
CREATE POLICY "Workers are viewable by everyone" 
ON workers FOR SELECT USING (true);

CREATE POLICY "Workers can be updated by the owner" 
ON workers FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Workers can be inserted by authenticated users" 
ON workers FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Workers can be deleted by the owner"
ON workers FOR DELETE USING (auth.uid()::text = user_id::text);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  address TEXT,
  city TEXT NOT NULL,
  postal_code TEXT,
  industry TEXT,
  logo_url TEXT,
  description TEXT,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE companies;

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies table
CREATE POLICY "Companies are viewable by everyone" 
ON companies FOR SELECT USING (true);

CREATE POLICY "Companies can be updated by the owner" 
ON companies FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Companies can be inserted by authenticated users" 
ON companies FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Companies can be deleted by the owner"
ON companies FOR DELETE USING (auth.uid()::text = user_id::text);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  company_id BIGINT REFERENCES companies(id) ON DELETE CASCADE,
  location TEXT NOT NULL,
  hourly_rate DECIMAL(10, 2) NOT NULL,
  required_skills TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  start_date TEXT NOT NULL,
  duration TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'filled', 'closed')),
  urgency_level TEXT DEFAULT 'normal' CHECK (urgency_level IN ('low', 'normal', 'high', 'urgent')),
  max_applications INTEGER,
  applicants_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE jobs;

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for jobs table
CREATE POLICY "Jobs are viewable by everyone" 
ON jobs FOR SELECT USING (true);

CREATE POLICY "Jobs can be updated by the company owner" 
ON jobs FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = jobs.company_id AND companies.user_id = auth.uid()
  )
);

CREATE POLICY "Jobs can be inserted by the company owner" 
ON jobs FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = jobs.company_id AND companies.user_id = auth.uid()
  )
);

CREATE POLICY "Jobs can be deleted by the company owner" 
ON jobs FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = jobs.company_id AND companies.user_id = auth.uid()
  )
);

-- Applications table (join table between workers and jobs)
CREATE TABLE IF NOT EXISTS applications (
  id BIGSERIAL PRIMARY KEY,
  job_id BIGINT REFERENCES jobs(id) ON DELETE CASCADE,
  worker_id BIGINT REFERENCES workers(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  message TEXT,
  availability_details TEXT,
  response_message TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, worker_id)
);

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE applications;

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for applications table
CREATE POLICY "Applications are viewable by the worker or company" 
ON applications FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM workers 
    WHERE workers.id = applications.worker_id AND workers.user_id = (select auth.uid())
  ) OR 
  EXISTS (
    SELECT 1 FROM jobs 
    JOIN companies ON jobs.company_id = companies.id
    WHERE jobs.id = applications.job_id AND companies.user_id = (select auth.uid())
  )
);

CREATE POLICY "Applications can be inserted by the worker" 
ON applications FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM workers 
    WHERE workers.id = applications.worker_id AND workers.user_id = (select auth.uid())
  )
);

CREATE POLICY "Applications can be updated by the worker or company" 
ON applications FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM workers 
    WHERE workers.id = applications.worker_id AND workers.user_id = (select auth.uid())
  ) OR 
  EXISTS (
    SELECT 1 FROM jobs 
    JOIN companies ON jobs.company_id = companies.id
    WHERE jobs.id = applications.job_id AND companies.user_id = (select auth.uid())
  )
);

CREATE POLICY "Applications can be deleted by the worker" 
ON applications FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM workers 
    WHERE workers.id = applications.worker_id AND workers.user_id = (select auth.uid())
  )
);

-- Function to update job applicants count
CREATE OR REPLACE FUNCTION update_job_applicants_count()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE jobs
    SET applicants_count = applicants_count + 1
    WHERE id = NEW.job_id;
  ELSIF (TG_OP = 'DELETE' AND OLD.status != 'withdrawn') THEN
    UPDATE jobs
    SET applicants_count = applicants_count - 1
    WHERE id = OLD.job_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update job applicants count
CREATE TRIGGER update_job_applicants_count_trigger
AFTER INSERT OR DELETE ON applications
FOR EACH ROW
EXECUTE FUNCTION update_job_applicants_count();

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  job_id BIGINT REFERENCES jobs(id) ON DELETE SET NULL,
  worker_id BIGINT REFERENCES workers(id) ON DELETE CASCADE,
  company_id BIGINT REFERENCES companies(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  posted_by_worker BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE reviews;

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reviews table
CREATE POLICY "Reviews are viewable by everyone" 
ON reviews FOR SELECT USING (true);

CREATE POLICY "Reviews can be inserted by the company" 
ON reviews FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = reviews.company_id AND companies.user_id = auth.uid()
  )
);

CREATE POLICY "Reviews can be updated by their author" 
ON reviews FOR UPDATE USING (
  (NOT reviews.posted_by_worker AND EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = reviews.company_id AND companies.user_id = auth.uid()
  )) OR
  (reviews.posted_by_worker AND EXISTS (
    SELECT 1 FROM workers 
    WHERE workers.id = reviews.worker_id AND workers.user_id = auth.uid()
  ))
);

CREATE POLICY "Reviews can be deleted by their author" 
ON reviews FOR DELETE USING (
  (NOT reviews.posted_by_worker AND EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = reviews.company_id AND companies.user_id = auth.uid()
  )) OR
  (reviews.posted_by_worker AND EXISTS (
    SELECT 1 FROM workers 
    WHERE workers.id = reviews.worker_id AND workers.user_id = auth.uid()
  ))
);

-- Function to update worker ratings
CREATE OR REPLACE FUNCTION update_worker_rating() 
RETURNS TRIGGER 
LANGUAGE plpgsql
AS $$
BEGIN
  -- Directly reference the inserted/updated review's worker_id
  -- Calculate new rating average
  WITH rating_stats AS (
    SELECT 
      worker_id,
      COALESCE(AVG(rating), 0) as avg_rating,
      COUNT(*) as review_count
    FROM reviews
    WHERE worker_id = NEW.worker_id
    GROUP BY worker_id
  )
  UPDATE workers w
  SET 
    rating = rs.avg_rating,
    reviews = rs.review_count,
    updated_at = NOW()
  FROM rating_stats rs
  WHERE w.id = rs.worker_id;
  
  RETURN NEW;
END;
$$;

-- Trigger to automatically update worker ratings when a review is added
CREATE TRIGGER update_worker_rating_trigger
AFTER INSERT OR UPDATE OF rating ON reviews
FOR EACH ROW
WHEN (NEW.posted_by_worker = false)
EXECUTE FUNCTION update_worker_rating();
