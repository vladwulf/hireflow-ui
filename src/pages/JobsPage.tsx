import { Plus, Search, Users, Calendar, ChevronRight } from 'lucide-react';

const jobs = [
  { id: '1', title: 'Senior Frontend Engineer', department: 'Engineering', candidates: 12, date: 'Apr 18, 2026', status: 'active', template: 'Software Engineer' },
  { id: '2', title: 'Product Manager', department: 'Product', candidates: 8, date: 'Apr 15, 2026', status: 'active', template: 'Product Manager' },
  { id: '3', title: 'UX Designer', department: 'Design', candidates: 5, date: 'Apr 10, 2026', status: 'closed', template: 'Designer' },
  { id: '4', title: 'Data Analyst', department: 'Analytics', candidates: 3, date: 'Apr 8, 2026', status: 'active', template: 'Data Analyst' },
  { id: '5', title: 'Backend Engineer', department: 'Engineering', candidates: 7, date: 'Apr 5, 2026', status: 'active', template: 'Software Engineer' },
  { id: '6', title: 'Marketing Manager', department: 'Marketing', candidates: 4, date: 'Apr 1, 2026', status: 'closed', template: 'Marketing Manager' },
];

const departmentColors: Record<string, string> = {
  Engineering: 'bg-violet-50 text-violet-700',
  Product: 'bg-blue-50 text-blue-700',
  Design: 'bg-pink-50 text-pink-700',
  Analytics: 'bg-orange-50 text-orange-700',
  Marketing: 'bg-green-50 text-green-700',
};

export default function JobsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Jobs</h1>
          <p className="text-sm text-gray-500 mt-1">{jobs.length} job descriptions</p>
        </div>
        <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus size={16} />
          New Job
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500">
          <option value="">All departments</option>
          <option>Engineering</option>
          <option>Product</option>
          <option>Design</option>
          <option>Analytics</option>
          <option>Marketing</option>
        </select>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500">
          <option value="">All statuses</option>
          <option>Active</option>
          <option>Closed</option>
        </select>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl border border-gray-200 px-6 py-4 flex items-center gap-6 hover:border-violet-200 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{job.title}</h3>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  job.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {job.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className={`px-2 py-0.5 rounded-md font-medium ${departmentColors[job.department] ?? 'bg-gray-100 text-gray-600'}`}>
                  {job.department}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={11} /> {job.candidates} candidates
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={11} /> {job.date}
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-400 shrink-0">
              Template: <span className="text-gray-600">{job.template}</span>
            </div>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-400 shrink-0 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
