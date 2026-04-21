import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../config/env';
import type { Template } from './useGetTemplates';

async function fetchTemplate(uuid: string): Promise<Template> {
  const res = await fetch(`${API_URL}/templates/${uuid}`);
  if (!res.ok) throw new Error('Failed to fetch template');
  return res.json();
}

export function useGetTemplate(uuid: string) {
  return useQuery({
    queryKey: ['templates', uuid],
    queryFn: () => fetchTemplate(uuid),
    enabled: !!uuid,
    staleTime: 1000 * 60 * 10, // treat as fresh for 10 min — content won't change once generated
  });
}
