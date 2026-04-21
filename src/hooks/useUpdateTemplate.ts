import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../config/env';
import type { Template } from './useGetTemplates';

async function updateTemplate(uuid: string, template: string): Promise<Template> {
  const res = await fetch(`${API_URL}/templates/${uuid}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ template }),
  });
  if (!res.ok) throw new Error('Failed to update template');
  return res.json();
}

export function useUpdateTemplate(uuid: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (template: string) => updateTemplate(uuid, template),
    onSuccess: (updated) => {
      queryClient.setQueryData(['templates', uuid], updated);
    },
  });
}
