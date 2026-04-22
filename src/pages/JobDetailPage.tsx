import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { ArrowLeft, Calendar, ChevronRight, Check, Loader2, Pencil, Plus, Star, Trash2, X } from 'lucide-react';
import Markdown from 'react-markdown';
import { useGetJob } from '../hooks/useGetJob';
import { useUpdateJob } from '../hooks/useUpdateJob';
import { useRegenerateJob } from '../hooks/useRegenerateJob';
import { useDeleteJob } from '../hooks/useDeleteJob';
import { useToggleJobStatus } from '../hooks/useToggleJobStatus';
import { useGetCandidates } from '../hooks/useGetCandidates';
import CreateCandidateModal from '../components/CreateCandidateModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

function scoreColor(score: number) {
  if (score >= 85) return 'text-emerald-700 bg-emerald-50';
  if (score >= 65) return 'text-orange-700 bg-orange-50';
  return 'text-red-700 bg-red-50';
}

type Tab = 'description' | 'candidates';

export default function JobDetailPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('description');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showRegenerate, setShowRegenerate] = useState(false);
  const [regenerateNotes, setRegenerateNotes] = useState('');

  const { data: job, isLoading, isError } = useGetJob(uuid!);
  const { mutate: updateJob, isPending: isSaving } = useUpdateJob(uuid!);
  const { mutate: regenerateJob, isPending: isRegenerating } = useRegenerateJob(uuid!);
  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob();
  const { mutate: toggleStatus, isPending: isToggling } = useToggleJobStatus(uuid!);
  const { data: candidates = [] } = useGetCandidates(job?.uuid ?? '');

  function handleEdit() {
    setDraft(job?.content ?? '');
    setEditing(true);
  }

  function handleCancel() {
    setEditing(false);
    setDraft('');
  }

  function handleSave() {
    updateJob(draft, {
      onSuccess: () => setEditing(false),
    });
  }

  function handleRegenerate() {
    regenerateJob(regenerateNotes, {
      onSuccess: () => {
        setShowRegenerate(false);
        setRegenerateNotes('');
      },
    });
  }

  function handleDelete() {
    deleteJob(uuid!, {
      onSuccess: () => navigate('/jobs'),
    });
  }

  if (isLoading) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse mb-6" />
        <div className="h-8 w-64 bg-gray-100 rounded animate-pulse mb-3" />
        <div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <Link to="/jobs" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ArrowLeft size={14} /> Back to Jobs
        </Link>
        <p className="text-sm text-red-500">Failed to load job. Please try again.</p>
      </div>
    );
  }

  const date = new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {confirmDelete && (
        <DeleteConfirmModal
          title={`Delete "${job.title}"?`}
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}

      <Link to="/jobs" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to Jobs
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-gray-900">{job.title}</h1>
            <button
              onClick={() => toggleStatus()}
              disabled={isToggling}
              title={job.status === 'ACTIVE' ? 'Click to close this job' : 'Click to reactivate this job'}
              className={`group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all disabled:cursor-not-allowed cursor-pointer ${
                job.status === 'ACTIVE'
                  ? 'bg-emerald-50 text-emerald-700 hover:bg-amber-50 hover:text-amber-700'
                  : 'bg-gray-100 text-gray-500 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              {isToggling ? (
                <Loader2 size={10} className="animate-spin" />
              ) : (
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  job.status === 'ACTIVE'
                    ? 'bg-emerald-500 group-hover:bg-amber-500'
                    : 'bg-gray-400 group-hover:bg-emerald-500'
                }`} />
              )}
              <span className="group-hover:hidden">
                {job.status === 'ACTIVE' ? 'Active' : 'Closed'}
              </span>
              <span className="hidden group-hover:inline">
                {job.status === 'ACTIVE' ? 'Close job' : 'Reactivate'}
              </span>
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 text-xs font-medium">{job.category}</span>
            <span className="flex items-center gap-1"><Calendar size={13} /> {date}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3 py-2 rounded-lg transition-colors"
          >
            <Trash2 size={13} />
            Delete
          </button>
          <button
            onClick={() => setShowRegenerate(true)}
            className="flex items-center gap-1.5 text-sm font-medium bg-amber-400 hover:bg-amber-500 text-amber-900 px-3 py-2 rounded-lg transition-colors"
          >
            Regenerate JD
          </button>
          <button
            onClick={() => setShowAddCandidate(true)}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={15} />
            Add Candidate
          </button>
        </div>
      </div>

      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {(['description', 'candidates'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); if (editing) handleCancel(); }}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${
              tab === t
                ? 'border-violet-600 text-violet-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t} {t === 'candidates' && `(${candidates.length})`}
          </button>
        ))}
      </div>

      {tab === 'description' && (
        <>
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
                  disabled={isSaving || draft === job.content}
                  className="flex items-center gap-1.5 text-sm font-medium bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  {isSaving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Pencil size={13} />
                  Edit
                </button>
              </div>
              <div className="prose prose-sm max-w-none">
                <Markdown>{job.content}</Markdown>
              </div>
            </div>
          )}
        </>
      )}

      {tab === 'candidates' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">{candidates.length} candidates</p>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              Sorted by score
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {candidates
              .sort((a, b) => (b.score?.overall ?? -1) - (a.score?.overall ?? -1))
              .map((candidate) => (
                <Link
                  key={candidate.uuid}
                  to={`/jobs/${job.uuid}/candidates/${candidate.uuid}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold flex items-center justify-center shrink-0">
                    {candidate.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                    <p className="text-xs text-gray-400">Added {new Date(candidate.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div className="shrink-0">
                    {candidate.score !== null ? (
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${scoreColor(candidate.score.overall)}`}>
                        {candidate.score.overall}%
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-400">
                        Not scored
                      </span>
                    )}
                  </div>
                  <ChevronRight size={15} className="text-gray-300 group-hover:text-gray-400 transition-colors shrink-0" />
                </Link>
              ))}
          </div>
        </div>
      )}

      {showAddCandidate && (
        <CreateCandidateModal jobId={job.uuid} onClose={() => setShowAddCandidate(false)} />
      )}

      {showRegenerate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">Regenerate Job Description</h2>
              <button
                onClick={() => { setShowRegenerate(false); setRegenerateNotes(''); }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500">Add kickoff notes or guidance for the regenerated job description.</p>
            <textarea
              value={regenerateNotes}
              onChange={(e) => setRegenerateNotes(e.target.value)}
              placeholder="e.g. Focus more on leadership skills, add remote-first culture details…"
              rows={6}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-y"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => { setShowRegenerate(false); setRegenerateNotes(''); }}
                disabled={isRegenerating}
                className="text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-200 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRegenerate}
                disabled={isRegenerating || !regenerateNotes.trim()}
                className="flex items-center gap-1.5 text-sm font-medium bg-amber-400 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-amber-900 px-4 py-2 rounded-lg transition-colors"
              >
                {isRegenerating ? <Loader2 size={14} className="animate-spin" /> : null}
                {isRegenerating ? 'Regenerating…' : 'Regenerate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
