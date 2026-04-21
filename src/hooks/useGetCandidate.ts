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

export interface CandidateDetail {
  id: number;
  uuid: string;
  name: string;
  cvText: string;
  appFormText: string | null;
  extraText: string | null;
  jobId: number;
  createdAt: string;
  updatedAt: string;
  score: CandidateScore | null;
}

async function fetchCandidate(uuid: string): Promise<CandidateDetail> {
  const res = await fetch(`${API_URL}/candidates/${uuid}`);
  if (!res.ok) throw new Error('Failed to fetch candidate');
  return res.json();
}

export function useGetCandidate(uuid: string) {
  return useQuery({
    queryKey: ['candidates', uuid],
    queryFn: () => fetchCandidate(uuid),
    enabled: !!uuid,
  });
}
