import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import Markdown from 'react-markdown';
import { ArrowLeft, Tag, Pencil, Check, X, Trash2 } from 'lucide-react';
import { useGetTemplate } from '../hooks/useGetTemplate';
import { useUpdateTemplate } from '../hooks/useUpdateTemplate';
import { useDeleteTemplate } from '../hooks/useDeleteTemplate';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const categoryColors: Record<string, string> = {
  Engineering: 'bg-violet-50 text-violet-700',
  Product: 'bg-blue-50 text-blue-700',
  Design: 'bg-pink-50 text-pink-700',
  Analytics: 'bg-orange-50 text-orange-700',
  Marketing: 'bg-green-50 text-green-700',
  Sales: 'bg-yellow-50 text-yellow-700',
};

export default function TemplateDetailPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const { data: template, isLoading, isError } = useGetTemplate(uuid ?? '');
  const { mutate: updateTemplate, isPending: isSaving } = useUpdateTemplate(uuid ?? '');
  const { mutate: deleteTemplate, isPending: isDeleting } = useDeleteTemplate();

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleEdit() {
    setDraft(template?.template ?? '');
    setEditing(true);
  }

  function handleCancel() {
    setEditing(false);
    setDraft('');
  }

  function handleSave() {
    updateTemplate(draft, {
      onSuccess: () => setEditing(false),
    });
  }

  function handleDelete() {
    deleteTemplate(uuid!, {
      onSuccess: () => navigate('/templates'),
    });
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link
        to="/templates"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Back to templates
      </Link>

      {isLoading && (
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-7 w-1/3 bg-gray-100 rounded" />
          <div className="h-4 w-24 bg-gray-100 rounded-full" />
          <div className="mt-4 flex flex-col gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`h-3 bg-gray-100 rounded ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
            ))}
          </div>
        </div>
      )}

      {isError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          Failed to load template.
        </div>
      )}

      {confirmDelete && (
        <DeleteConfirmModal
          title={`Delete "${template?.name}"?`}
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}

      {template && (
        <>
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-semibold text-gray-900">{template.name}</h1>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[template.category] ?? 'bg-gray-100 text-gray-600'}`}>
                {template.category}
              </span>

              {!editing && (
                <>
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Pencil size={13} />
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tags */}
          {template.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-8">
              <Tag size={13} className="text-gray-400" />
              <div className="flex flex-wrap gap-1.5">
                {template.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          {editing ? (
            <div className="flex flex-col gap-3">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="w-full min-h-[560px] border border-gray-200 rounded-xl p-6 text-sm text-gray-800 font-mono leading-relaxed resize-y outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                spellCheck={false}
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-200 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X size={14} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving || draft === template.template}
                  className="flex items-center gap-1.5 text-sm font-medium bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Check size={14} />
                  {isSaving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-8 prose prose-sm prose-gray max-w-none">
              <Markdown>{template.template}</Markdown>
            </div>
          )}
        </>
      )}
    </div>
  );
}
