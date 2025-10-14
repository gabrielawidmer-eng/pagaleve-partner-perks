-- Fix the has_role function by dropping policies first, then recreating
-- Drop all policies that depend on has_role
DROP POLICY IF EXISTS "Admins can view all user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all benefits" ON public.benefits;
DROP POLICY IF EXISTS "Admins can insert benefits" ON public.benefits;
DROP POLICY IF EXISTS "Admins can update benefits" ON public.benefits;
DROP POLICY IF EXISTS "Admins can delete benefits" ON public.benefits;
DROP POLICY IF EXISTS "Admins can upload benefit logos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update benefit logos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete benefit logos" ON storage.objects;

-- Now drop and recreate the function with correct search_path
DROP FUNCTION IF EXISTS public.has_role(UUID, public.app_role);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
    AND role = _role
  )
$$;

-- Recreate all policies
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