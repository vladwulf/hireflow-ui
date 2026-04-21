import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../config/env';

export interface CreateJobDto {
  title: string;
  templateId: string;
  department?: string;
  notes?: string;
}

async function createJob(dto: CreateJobDto) {
  const res = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error('Failed to create job');
  return res.json();
}

export function useCreateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}
