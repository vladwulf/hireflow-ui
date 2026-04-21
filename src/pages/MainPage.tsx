import { Briefcase, FileText, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const stats = [
  { label: 'Active Jobs', value: '12', icon: Briefcase, color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Templates', value: '8', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Candidates', value: '47', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Avg. Score', value: '74%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const recentJobs = [
  { id: '1', title: 'Senior Frontend Engineer', department: 'Engineering', candidates: 12, date: 'Apr 18, 2026', status: 'active' },
  { id: '2', title: 'Product Manager', department: 'Product', candidates: 8, date: 'Apr 15, 2026', status: 'active' },
  { id: '3', title: 'UX Designer', department: 'Design', candidates: 5, date: 'Apr 10, 2026', status: 'closed' },
  { id: '4', title: 'Data Analyst', department: 'Analytics', candidates: 3, date: 'Apr 8, 2026', status: 'active' },
];

export default function MainPage() {
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
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
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
            {recentJobs.map((job) => (
              <tr key={job.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{job.candidates}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{job.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    job.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
