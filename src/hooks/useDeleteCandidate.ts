import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../config/env';

async function deleteCandidate(uuid: string) {
  const res = await fetch(`${API_URL}/candidates/${uuid}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete candidate');
}

export function useDeleteCandidate(jobUuid: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => deleteCandidate(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates', 'job', jobUuid] });
    },
  });
}
