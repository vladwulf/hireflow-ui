import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../config/env';
import type { JobDetail } from './useGetJob';

async function toggleJobStatus(uuid: string): Promise<JobDetail> {
  const res = await fetch(`${API_URL}/jobs/${uuid}/status`, { method: 'PATCH' });
  if (!res.ok) throw new Error('Failed to update job status');
  return res.json();
}

export function useToggleJobStatus(uuid: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => toggleJobStatus(uuid),
    onSuccess: (updated) => {
      queryClient.setQueryData(['jobs', uuid], updated);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}
