import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../config/env';

export interface CreateTemplateDto {
  name: string;
  category: string;
  description: string;
  tags: string[];
}

async function createTemplate(dto: CreateTemplateDto) {
  const res = await fetch(`${API_URL}/templates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error('Failed to create template');
  return res.json();
}

export function useCreateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
}
