import { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { useCreateJob } from '../hooks/useCreateJob';
import { useGetTemplates } from '../hooks/useGetTemplates';

const categories = ['Engineering', 'Product', 'Design', 'Analytics', 'Marketing', 'Sales', 'Legal', 'Support'];

interface Props {
  onClose: () => void;
}

export default function CreateJobModal({ onClose }: Props) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [templateUuid, setTemplateUuid] = useState('');
  const [content, setContent] = useState('');

  const { data: templates, isLoading: templatesLoading } = useGetTemplates();
  const { mutate: createJob, isPending } = useCreateJob();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createJob({ title, category, content, templateUuid }, { onSuccess: onClose });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">New Job</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Senior Frontend Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Template</label>
            <select
              required
              value={templateUuid}
              onChange={(e) => setTemplateUuid(e.target.value)}
              disabled={templatesLoading}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white disabled:opacity-50"
            >
              <option value="" disabled>
                {templatesLoading ? 'Loading templates...' : 'Select a template'}
              </option>
              {templates?.map((t) => (
                <option key={t.uuid} value={t.uuid}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Kick-Off Call Notes</label>
            <textarea
              rows={4}
              required
              placeholder="e.g. We are looking for a senior frontend engineer with 5 years of experience..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-y"
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
              {isPending ? 'Creating…' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
