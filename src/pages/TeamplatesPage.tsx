import { useState } from 'react';
import { Link } from 'react-router';
import { Plus, FileText, ChevronRight, Tag, AlertCircle } from 'lucide-react';
import CreateTemplateModal from '../components/CreateTemplateModal';
import { useGetTemplates } from '../hooks/useGetTemplates';

const categoryColors: Record<string, string> = {
  Engineering: 'bg-violet-50 text-violet-700',
  Product: 'bg-blue-50 text-blue-700',
  Design: 'bg-pink-50 text-pink-700',
  Analytics: 'bg-orange-50 text-orange-700',
  Marketing: 'bg-green-50 text-green-700',
  Sales: 'bg-yellow-50 text-yellow-700',
  Legal: 'bg-slate-50 text-slate-700',
  Support: 'bg-teal-50 text-teal-700',
};

export default function TeamplatesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: templates = [], isLoading, isError } = useGetTemplates();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Templates</h1>
          <p className="text-sm text-gray-500 mt-1">
            {isLoading ? 'Loading…' : `${templates.length} job description template${templates.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <Plus size={16} />
          New Template
        </button>
      </div>

      {modalOpen && <CreateTemplateModal onClose={() => setModalOpen(false)} />}

      {isError && (
        <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          Failed to load templates. Is the API running?
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3 animate-pulse">
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-lg bg-gray-100" />
                <div className="h-5 w-20 bg-gray-100 rounded-full" />
              </div>
              <div className="h-4 w-3/4 bg-gray-100 rounded" />
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-2/3 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <Link
              key={template.uuid}
              to={`/templates/${template.uuid}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-violet-200 hover:shadow-sm transition-all group flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                  <FileText size={16} className="text-violet-600" />
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[template.category] ?? 'bg-gray-100 text-gray-600'}`}>
                  {template.category}
                </span>
              </div>

              <h3 className="text-sm py-4 font-semibold text-gray-900 mb-1">{template.name}</h3>

              {template.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Tag size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end pt-4 border-t border-gray-100 mt-auto">
                <span className="flex items-center gap-1 text-xs text-violet-600 font-medium group-hover:gap-1.5 transition-all">
                  Use template <ChevronRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
