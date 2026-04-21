import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../config/env';

export interface CandidateScore {
  id: number;
  overall: number;
  skillsMatch: number;
  experience: number;
  cultureFit: number;
  summary: string;
  pros: string[];
  cons: string[];
  candidateId: number;
  createdAt: string;
}

export interface Candidate {
  id: number;
  uuid: string;
  name: string;
  createdAt: string;
  score: CandidateScore | null;
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
