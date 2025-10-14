-- Create enum for benefit types
CREATE TYPE public.benefit_type AS ENUM ('desconto', 'credito', 'gratuidade', 'mentoria', 'outro');

-- Create enum for benefit categories
CREATE TYPE public.benefit_category AS ENUM ('marketing', 'logistica', 'financas', 'ferramentas', 'tecnologia', 'recursos_humanos', 'outro');

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
    AND role = _role
  )
$$;

-- Create benefits table
CREATE TABLE public.benefits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  company_website VARCHAR(500),
  company_contact VARCHAR(255),
  company_summary TEXT,
  logo_url TEXT,
  description TEXT NOT NULL,
  category public.benefit_category NOT NULL,
  benefit_type public.benefit_type NOT NULL,
  redemption_link VARCHAR(500),
  additional_info TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on benefits
ALTER TABLE public.benefits ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_roles (only admins can manage roles)
CREATE POLICY "Admins can view all user roles"
  ON public.user_roles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert user roles"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update user roles"
  ON public.user_roles
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete user roles"
  ON public.user_roles
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for benefits
CREATE POLICY "Everyone can view active benefits"
  ON public.benefits
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all benefits"
  ON public.benefits
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert benefits"
  ON public.benefits
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update benefits"
  ON public.benefits
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete benefits"
  ON public.benefits
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for benefits table
CREATE TRIGGER update_benefits_updated_at
  BEFORE UPDATE ON public.benefits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for benefit logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('benefit-logos', 'benefit-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for benefit-logos bucket
CREATE POLICY "Public can view benefit logos"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'benefit-logos');

CREATE POLICY "Admins can upload benefit logos"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'benefit-logos' 
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can update benefit logos"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'benefit-logos' 
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete benefit logos"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'benefit-logos' 
    AND public.has_role(auth.uid(), 'admin')
  );