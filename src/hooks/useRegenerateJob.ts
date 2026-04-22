import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../config/env';
import type { JobDetail } from './useGetJob';

async function regenerateJob(id: string, content: string): Promise<JobDetail> {
  const res = await fetch(`${API_URL}/jobs/${id}/regenerate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error('Failed to regenerate job');
  return res.json();
}

export function useRegenerateJob(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => regenerateJob(id, content),
    onSuccess: (updated) => {
      queryClient.setQueryData(['jobs', id], updated);
    },
  });
}
