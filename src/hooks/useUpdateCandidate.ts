import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../config/env';

export interface UpdateCandidateDto {
  cvText?: string;
  appFormText?: string;
  extraText?: string;
}

async function updateCandidate(uuid: string, dto: UpdateCandidateDto) {
  const res = await fetch(`${API_URL}/candidates/${uuid}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error('Failed to update candidate');
  return res.json();
}

export function useUpdateCandidate(uuid: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateCandidateDto) => updateCandidate(uuid, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates', uuid] });
    },
  });
}
