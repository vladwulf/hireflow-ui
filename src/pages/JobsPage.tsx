import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import JobCard from '../components/JobCard';
import CreateJobModal from '../components/CreateJobModal';
import { useGetJobList } from '../hooks/useGetJobList';

export default function JobsPage() {
  const [showModal, setShowModal] = useState(false);
  const { data: jobs, isLoading, isError } = useGetJobList();

  return (
    <>
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Jobs</h1>
          {jobs && <p className="text-sm text-gray-500 mt-1">{jobs.length} job descriptions</p>}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
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

      {isError && (
        <p className="text-sm text-red-500">Failed to load jobs. Please try again.</p>
      )}

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 px-6 py-4 h-16 animate-pulse" />
          ))}
        </div>
      )}

      {jobs && (
        <div className="space-y-3">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              uuid={job.uuid}
              title={job.title}
              category={job.category}
              status={job.status}
              createdAt={job.createdAt}
            />
          ))}
        </div>
      )}
    </div>

    {showModal && <CreateJobModal onClose={() => setShowModal(false)} />}
    </>
  );
}
