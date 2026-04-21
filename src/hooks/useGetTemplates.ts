import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../config/env';

export interface Template {
  id: string;
  uuid: string;
  name: string;
  jobDescription: string;
  createdAt: string;
  updatedAt: string;
}

async function fetchTemplates(): Promise<Template[]> {
  const res = await fetch(`${API_URL}/templates`);
  if (!res.ok) throw new Error('Failed to fetch templates');
  return res.json();
}

export function useGetTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: fetchTemplates,
  });
}
