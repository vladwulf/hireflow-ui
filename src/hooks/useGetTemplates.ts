import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../config/env';

export interface Template {
  name: string;
  uuid: string;
  category: string;
  description: string;
  template: string | null;
  tags: string[];
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
