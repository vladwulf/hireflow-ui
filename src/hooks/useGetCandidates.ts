import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../config/env';

export interface Candidate {
  id: string;
  uuid: string;
  name: string;
  createdAt: string;
  score: number | null;
  status: 'pending' | 'reviewed';
}

async function fetchCandidates(jobUuid: string): Promise<Candidate[]> {
  const res = await fetch(`${API_URL}/candidates/job/${jobUuid}`);
  if (!res.ok) throw new Error('Failed to fetch candidates');
  return res.json();
}

export function useGetCandidates(jobUuid: string) {
  return useQuery({
    queryKey: ['candidates', jobUuid],
    queryFn: () => fetchCandidates(jobUuid),
    enabled: !!jobUuid,
  });
}
