import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, CheckCircle, XCircle, Minus, Upload, Check, X, Loader2 } from 'lucide-react';
import { parseCvFile } from '../utils/parseCvFile';
import { useGetCandidate } from '../hooks/useGetCandidate';
import { useGetJob } from '../hooks/useGetJob';
import { useUpdateCandidate } from '../hooks/useUpdateCandidate';
import { useScoreCandidate } from '../hooks/useScoreCandidate';

function ScoreBar({ value }: { value: number }) {
  const color = value >= 85 ? 'bg-emerald-500' : value >= 65 ? 'bg-orange-400' : 'bg-red-400';
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-sm font-semibold text-gray-700 w-8 text-right">{value}</span>
    </div>
  );
}

function scoreRingColor(score: number) {
  if (score >= 85) return 'text-emerald-600';
  if (score >= 65) return 'text-orange-500';
  return 'text-red-500';
}

interface CvBoxProps {
  content: string | null;
  onSave: (text: string) => void;
  isSaving: boolean;
}

function CvBox({ content, onSave, isSaving }: CvBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pasting, setPasting] = useState(false);
  const [draft, setDraft] = useState('');
  const [isParsing, setIsParsing] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    setIsParsing(true);
    try {
      const text = await parseCvFile(file);
      setDraft(text);
      setPasting(true);
    } finally {
      setIsParsing(false);
    }
  }

  function handlePasteOpen() {
    setDraft(content ?? '');
    setPasting(true);
  }

  function handlePasteCancel() {
    setPasting(false);
    setDraft('');
  }

  function handlePasteSave() {
    onSave(draft);
    setPasting(false);
    setDraft('');
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Curriculum Vitae</h2>
          <p className="text-xs text-gray-400 mt-0.5">Candidate's resume or CV</p>
        </div>
        {!pasting && (
          <div className="flex items-center gap-2 ml-4 shrink-0">
            <button
              onClick={handlePasteOpen}
              disabled={isParsing}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-50"
            >
              Paste text
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isSaving || isParsing}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {isParsing ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
              {isParsing ? 'Parsing…' : 'Upload'}
            </button>
            <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt,.md" className="hidden" onChange={handleFile} />
          </div>
        )}
      </div>

      {pasting ? (
        <div className="flex flex-col gap-2">
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Paste CV text here…"
            className="w-full min-h-48 border border-gray-200 rounded-lg p-3 text-xs font-mono text-gray-800 leading-relaxed resize-y outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            spellCheck={false}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handlePasteCancel}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <X size={12} /> Cancel
            </button>
            <button
              onClick={handlePasteSave}
              disabled={isSaving || !draft.trim()}
              className="flex items-center gap-1.5 text-xs font-medium bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              <Check size={12} /> {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      ) : content ? (
        <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono bg-gray-50 rounded-lg p-4 leading-relaxed max-h-64 overflow-y-auto">
          {content}
        </pre>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <Upload size={16} className="text-gray-300 mb-2" />
          <p className="text-xs text-gray-400">Upload a file or paste text</p>
        </div>
      )}
    </div>
  );
}

interface TextBoxProps {
  title: string;
  description: string;
  content: string | null;
  onSave: (text: string) => void;
  isSaving: boolean;
}

function TextBox({ title, description, content, onSave, isSaving }: TextBoxProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  function handleOpen() {
    setDraft(content ?? '');
    setEditing(true);
  }

  function handleCancel() {
    setEditing(false);
    setDraft('');
  }

  function handleSave() {
    onSave(draft);
    setEditing(false);
    setDraft('');
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        </div>
        {!editing && (
          <button
            onClick={handleOpen}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 px-2.5 py-1.5 rounded-lg transition-colors ml-4 shrink-0"
          >
            {content ? 'Edit' : 'Add'}
          </button>
        )}
      </div>

      {editing ? (
        <div className="flex flex-col gap-2">
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Enter ${title.toLowerCase()} here…`}
            className="w-full min-h-36 border border-gray-200 rounded-lg p-3 text-xs font-mono text-gray-800 leading-relaxed resize-y outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            spellCheck={false}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <X size={12} /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !draft.trim()}
              className="flex items-center gap-1.5 text-xs font-medium bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              <Check size={12} /> {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      ) : content ? (
        <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono bg-gray-50 rounded-lg p-4 leading-relaxed max-h-64 overflow-y-auto">
          {content}
        </pre>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <p className="text-xs text-gray-400">No content added yet</p>
        </div>
      )}
    </div>
  );
}

export default function CandidateDetailPage() {
  const { uuid: jobUuid, candidateId } = useParams<{ uuid: string; candidateId: string }>();

  const { data: candidate, isLoading, isError } = useGetCandidate(candidateId!);
  const { data: job } = useGetJob(jobUuid!);
  const { mutate: updateCandidate, isPending: isUpdating } = useUpdateCandidate(candidateId!);
  const { mutate: scoreCandidate, isPending: isScoring } = useScoreCandidate(candidateId!);

  if (isLoading) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="h-4 w-32 bg-gray-100 rounded animate-pulse mb-6" />
        <div className="h-8 w-48 bg-gray-100 rounded animate-pulse mb-3" />
        <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
      </div>
    );
  }

  if (isError || !candidate) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <Link to={`/jobs/${jobUuid}`} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ArrowLeft size={14} /> Back to Job
        </Link>
        <p className="text-sm text-red-500">Failed to load candidate. Please try again.</p>
      </div>
    );
  }

  const { score } = candidate;
  const addedDate = new Date(candidate.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Link
        to={`/jobs/${jobUuid}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Back to {job?.title ?? 'Job'}
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-violet-100 text-violet-700 font-semibold text-lg flex items-center justify-center">
            {candidate.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{candidate.name}</h1>
            <p className="text-sm text-gray-400 mt-0.5">Added {addedDate}</p>
          </div>
        </div>
        <button
          onClick={() => scoreCandidate()}
          disabled={isScoring}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {isScoring ? 'Scoring…' : score ? 'Re-score' : 'Score'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {score && (
            <>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Summary</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{score.summary}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-gray-900 mb-4">Score Breakdown</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Skills Match', value: score.skillsMatch },
                    { label: 'Experience', value: score.experience },
                    { label: 'Culture Fit', value: score.cultureFit },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-gray-500">{label}</span>
                      </div>
                      <ScoreBar value={value} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={14} className="text-emerald-500" />
                    <h2 className="text-sm font-semibold text-gray-900">Strengths</h2>
                  </div>
                  <ul className="space-y-2">
                    {score.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="text-emerald-400 mt-0.5 shrink-0"><Minus size={10} /></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle size={14} className="text-red-400" />
                    <h2 className="text-sm font-semibold text-gray-900">Weaknesses</h2>
                  </div>
                  <ul className="space-y-2">
                    {score.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="text-red-300 mt-0.5 shrink-0"><Minus size={10} /></span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          <CvBox
            content={candidate.cvText}
            onSave={(text) => updateCandidate({ cvText: text })}
            isSaving={isUpdating}
          />

          <TextBox
            title="Application Form"
            description="Responses submitted during application"
            content={candidate.appFormText}
            onSave={(text) => updateCandidate({ appFormText: text })}
            isSaving={isUpdating}
          />

          <TextBox
            title="Additional Information"
            description="Any extra context or supplementary material"
            content={candidate.extraText}
            onSave={(text) => updateCandidate({ extraText: text })}
            isSaving={isUpdating}
          />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-xs font-medium text-gray-500 mb-3">Overall Score</p>
            {score ? (
              <>
                <p className={`text-5xl font-bold ${scoreRingColor(score.overall)}`}>{score.overall}</p>
                <p className="text-xs text-gray-400 mt-1">out of 100</p>
              </>
            ) : (
              <p className="text-sm text-gray-400">Not scored</p>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Applied For</h2>
            <Link
              to={`/jobs/${jobUuid}`}
              className="text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors"
            >
              {job?.title ?? '—'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
