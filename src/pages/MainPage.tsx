import { Briefcase, FileText, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useGetStats } from '../hooks/useGetStats';

export default function MainPage() {
  const { data, isLoading } = useGetStats();

  const stats = [
    { label: 'Active Jobs', value: data?.activeJobs ?? '—', icon: Briefcase, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Templates', value: data?.templates ?? '—', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Candidates', value: data?.candidates ?? '—', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg. Score', value: data?.avgScore != null ? `${data.avgScore}%` : '—', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your recruitment activity</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            {isLoading ? (
              <div className="h-7 w-12 bg-gray-100 rounded animate-pulse mb-1" />
            ) : (
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
            )}
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900">Recent Jobs</h2>
          <Link to="/jobs" className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Job Title</th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Department</th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Candidates</th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Created</th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-3.5 bg-gray-100 rounded animate-pulse" style={{ width: j === 0 ? '60%' : '40%' }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : data?.recentJobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">
                  No jobs yet
                </td>
              </tr>
            ) : (
              data?.recentJobs.map((job) => {
                const date = new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                return (
                  <tr key={job.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <Link to={`/jobs/${job.uuid}`} className="hover:text-violet-600 transition-colors">
                        {job.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{job.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{job.candidateCount}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        job.status === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {job.status.charAt(0) + job.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
