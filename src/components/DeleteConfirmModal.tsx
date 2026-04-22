import { Loader2, Trash2, X } from 'lucide-react';

interface Props {
  title: string;
  description?: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({ title, description, isDeleting, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 shrink-0">
            <Trash2 size={18} className="text-red-600" />
          </div>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>
        <h2 className="text-base font-semibold text-gray-900 mb-1">{title}</h2>
        <p className="text-sm text-gray-500 mb-6">
          {description ?? 'This action cannot be undone.'}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl transition-colors"
          >
            {isDeleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
            {isDeleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
