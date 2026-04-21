import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../config/env';
import type { JobStatus } from './useGetJobList';

export interface JobDetail {
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

async function fetchJob(id: string): Promise<JobDetail> {
  const res = await fetch(`${API_URL}/jobs/${id}`);
  if (!res.ok) throw new Error('Failed to fetch job');
  return res.json();
}

export function useGetJob(id: string) {
  return useQuery({
    queryKey: ['jobs', id],
    queryFn: () => fetchJob(id),
  });
}
