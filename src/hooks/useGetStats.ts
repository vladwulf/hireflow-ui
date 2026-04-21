import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../config/env';

export interface RecentJob {
  id: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
  candidateCount: number;
}

export interface Stats {
  activeJobs: number;
  templates: number;
  candidates: number;
  avgScore: number | null;
  recentJobs: RecentJob[];
}

async function fetchStats(): Promise<Stats> {
  const res = await fetch(`${API_URL}/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export function useGetStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
    staleTime: 30_000,
  });
}
