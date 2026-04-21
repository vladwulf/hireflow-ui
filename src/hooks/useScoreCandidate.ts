import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../config/env';

async function scoreCandidate(uuid: string) {
  const res = await fetch(`${API_URL}/candidates/${uuid}/score`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to score candidate');
  return res.json();
}

export function useScoreCandidate(uuid: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => scoreCandidate(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates', uuid] });
    },
  });
}
