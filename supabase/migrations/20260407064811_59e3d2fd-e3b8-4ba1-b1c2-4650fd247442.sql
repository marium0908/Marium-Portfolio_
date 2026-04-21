
-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Profile table (singleton)
CREATE TABLE public.profile (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Marium Binte Muhammad',
  title TEXT NOT NULL DEFAULT 'Full-Stack Web Developer',
  bio TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  journey_started TEXT,
  tagline TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update profile" ON public.profile FOR UPDATE TO authenticated USING (true);
CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON public.profile FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  technologies TEXT[] DEFAULT '{}',
  image TEXT,
  live_link TEXT,
  github_link TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Auth can insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth can update projects" ON public.projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth can delete projects" ON public.projects FOR DELETE TO authenticated USING (true);
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  content TEXT,
  read_time TEXT,
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Auth can insert blogs" ON public.blogs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth can update blogs" ON public.blogs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth can delete blogs" ON public.blogs FOR DELETE TO authenticated USING (true);
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Skills table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  icon TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Auth can insert skills" ON public.skills FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth can update skills" ON public.skills FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth can delete skills" ON public.skills FOR DELETE TO authenticated USING (true);

-- Services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Auth can insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth can update services" ON public.services FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth can delete services" ON public.services FOR DELETE TO authenticated USING (true);

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  avatar TEXT,
  rating INT DEFAULT 5,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Auth can insert testimonials" ON public.testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth can update testimonials" ON public.testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth can delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (true);

-- Messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert messages" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth can view messages" ON public.messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth can delete messages" ON public.messages FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth can update messages" ON public.messages FOR UPDATE TO authenticated USING (true);

-- Storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);
CREATE POLICY "Anyone can view portfolio images" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Auth can upload portfolio images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');
CREATE POLICY "Auth can update portfolio images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio');
CREATE POLICY "Auth can delete portfolio images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio');
