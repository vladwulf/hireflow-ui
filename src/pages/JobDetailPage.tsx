import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Users, Calendar, ChevronRight, Plus, Star } from 'lucide-react';

const job = {
  id: '1',
  title: 'Senior Frontend Engineer',
  department: 'Engineering',
  status: 'active',
  template: 'Software Engineer',
  createdAt: 'Apr 18, 2026',
  description: `We are looking for a Senior Frontend Engineer to join our growing Engineering team. You will work closely with product and design to build fast, accessible, and delightful user experiences.

## Responsibilities

- Build and maintain high-quality React applications
- Collaborate with designers to implement pixel-perfect UIs
- Write well-tested, performant, and maintainable code
- Mentor junior engineers and participate in code reviews
- Contribute to architectural decisions and technical roadmap

## Requirements

- 5+ years of experience with React and TypeScript
- Strong understanding of web performance and accessibility
- Experience with modern CSS and design systems
- Familiarity with testing frameworks (Jest, Playwright)
- Strong communication and collaboration skills

## Nice to Have

- Experience with Next.js or Remix
- Familiarity with GraphQL or tRPC
- Open source contributions

## Benefits

- Competitive salary and equity
- Remote-first culture
- Health, dental, and vision insurance
- $2,000 annual learning budget`,
};

const candidates = [
  { id: '1', name: 'Alice Martin', addedAt: 'Apr 19, 2026', score: 87, status: 'reviewed' },
  { id: '2', name: 'Bob Chen', addedAt: 'Apr 19, 2026', score: 72, status: 'reviewed' },
  { id: '3', name: 'Clara Nguyen', addedAt: 'Apr 20, 2026', score: 91, status: 'reviewed' },
  { id: '4', name: 'David Kim', addedAt: 'Apr 20, 2026', score: null, status: 'pending' },
  { id: '5', name: 'Eva Rossi', addedAt: 'Apr 21, 2026', score: null, status: 'pending' },
];

function scoreColor(score: number) {
  if (score >= 85) return 'text-emerald-700 bg-emerald-50';
  if (score >= 65) return 'text-orange-700 bg-orange-50';
  return 'text-red-700 bg-red-50';
}

type Tab = 'description' | 'candidates';

export default function JobDetailPage() {
  const [tab, setTab] = useState<Tab>('description');

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Link to="/jobs" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to Jobs
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-gray-900">{job.title}</h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
              {job.status}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 text-xs font-medium">{job.department}</span>
            <span className="flex items-center gap-1"><Users size={13} /> {candidates.length} candidates</span>
            <span className="flex items-center gap-1"><Calendar size={13} /> {job.createdAt}</span>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus size={15} />
          Add Candidate
        </button>
      </div>

      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {(['description', 'candidates'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
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
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-gray-400">Template: <span className="text-gray-600">{job.template}</span></p>
            <button className="text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors">Edit</button>
          </div>
          <div className="prose prose-sm max-w-none text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {job.description}
          </div>
        </div>
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
              .sort((a, b) => (b.score ?? -1) - (a.score ?? -1))
              .map((candidate) => (
                <Link
                  key={candidate.id}
                  to={`/jobs/${job.id}/candidates/${candidate.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold flex items-center justify-center shrink-0">
                    {candidate.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                    <p className="text-xs text-gray-400">Added {candidate.addedAt}</p>
                  </div>
                  <div className="shrink-0">
                    {candidate.score !== null ? (
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${scoreColor(candidate.score)}`}>
                        {candidate.score}%
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
    </div>
  );
}
