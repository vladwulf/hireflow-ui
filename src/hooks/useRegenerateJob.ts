import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../config/env';
import type { JobDetail } from './useGetJob';

interface RegenerateJobDto {
  content?: string;
  title?: string;
}

async function regenerateJob(id: string, dto: RegenerateJobDto): Promise<JobDetail> {
  const res = await fetch(`${API_URL}/jobs/${id}/regenerate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error('Failed to regenerate job');
  return res.json();
}

export function useRegenerateJob(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: RegenerateJobDto) => regenerateJob(id, dto),
    onSuccess: (updated) => {
      queryClient.setQueryData(['jobs', id], updated);
    },
  });
}
