import { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { useCreateCandidate } from '../hooks/useCreateCandidate';

interface Props {
  jobId: string;
  onClose: () => void;
}

export default function CreateCandidateModal({ jobId, onClose }: Props) {
  const [name, setName] = useState('');
  const { mutate: createCandidate, isPending } = useCreateCandidate(jobId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createCandidate({ jobId, name }, { onSuccess: onClose });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">Add Candidate</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Alice Martin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-lg transition-colors cursor-pointer"
            >
              {isPending && <Loader2 size={14} className="animate-spin" />}
              {isPending ? 'Adding…' : 'Add Candidate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
