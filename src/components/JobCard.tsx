import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import type { JobStatus } from '../hooks/useGetJobList';

const categoryColors: Record<string, string> = {
  Engineering: 'bg-violet-50 text-violet-700',
  Product: 'bg-blue-50 text-blue-700',
  Design: 'bg-pink-50 text-pink-700',
  Analytics: 'bg-orange-50 text-orange-700',
  Marketing: 'bg-green-50 text-green-700',
};

export interface JobCardProps {
  uuid: string;
  title: string;
  category: string;
  status: JobStatus;
  createdAt: string;
}

export default function JobCard({ uuid, title, category, status, createdAt }: JobCardProps) {
  const date = new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <Link
      to={`/jobs/${uuid}`}
      className="bg-white rounded-xl border border-gray-200 px-6 py-4 flex items-center gap-6 hover:border-violet-200 hover:shadow-sm transition-all group"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{title}</h3>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
          }`}>
            {status.charAt(0) + status.slice(1).toLowerCase()}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className={`px-2 py-0.5 rounded-md font-medium ${categoryColors[category] ?? 'bg-gray-100 text-gray-600'}`}>
            {category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} /> {date}
          </span>
        </div>
      </div>
      <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-400 shrink-0 transition-colors" />
    </Link>
  );
}
