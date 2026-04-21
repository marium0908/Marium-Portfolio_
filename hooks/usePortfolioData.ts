import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profile").select("*").limit(1).single();
      if (error) throw error;
      return data;
    },
  });

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

export const useBlogs = () =>
  useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useBlog = (id?: string) =>
  useQuery({
    queryKey: ["blog", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from("blogs").select("*").eq("id", id!).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const useProject = (id?: string) =>
  useQuery({
    queryKey: ["project", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("id", id!).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const useSkills = () =>
  useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase.from("skills").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

export const useServices = () =>
  useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

export const useTestimonials = () =>
  useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

export const useMessages = () =>
  useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
