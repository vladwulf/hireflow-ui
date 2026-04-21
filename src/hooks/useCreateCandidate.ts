import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../config/env';

export interface CreateCandidateDto {
  jobId: string;
  name: string;
}

async function createCandidate(dto: CreateCandidateDto) {
  const res = await fetch(`${API_URL}/candidates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error('Failed to create candidate');
  return res.json();
}

export function useCreateCandidate(jobUuid: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates', jobUuid] });
    },
  });
}
