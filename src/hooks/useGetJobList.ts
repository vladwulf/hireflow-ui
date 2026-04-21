import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../config/env';

export type JobStatus = 'ACTIVE' | 'CLOSED';

export interface Job {
  id: string;
  uuid: string;
  title: string;
  category: string;
  status: JobStatus;
  content: string;
  templateId: number;
  createdAt: string;
  updatedAt: string;
}

async function fetchJobs(): Promise<Job[]> {
  const res = await fetch(`${API_URL}/jobs`);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

export function useGetJobList() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });
}
