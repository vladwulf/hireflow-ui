import { Link } from 'react-router';
import { ArrowLeft, CheckCircle, XCircle, Minus } from 'lucide-react';

const candidate = {
  id: '3',
  name: 'Clara Nguyen',
  addedAt: 'Apr 20, 2026',
  jobTitle: 'Senior Frontend Engineer',
  jobId: '1',
  cvText: `Clara Nguyen
clara@example.com | linkedin.com/in/claranguyen | github.com/claranguyen

EXPERIENCE

Senior Frontend Engineer — Stripe (2022–present)
- Led the redesign of the Stripe Dashboard, improving task completion rates by 18%
- Built a design system used by 40+ engineers across 6 product teams
- Mentored 3 junior engineers and ran bi-weekly frontend guild sessions

Frontend Engineer — Vercel (2019–2022)
- Contributed to the Next.js open-source project (200+ merged PRs)
- Owned the deployment preview UI from prototype to production

SKILLS
React, TypeScript, Next.js, CSS, Tailwind, GraphQL, Testing Library, Playwright

EDUCATION
B.S. Computer Science — UC Berkeley, 2019`,
  score: {
    overall: 91,
    skills: 95,
    experience: 90,
    culture: 88,
    summary:
      'Clara is a strong match for this role. Her experience at Stripe and Vercel closely mirrors the technical and collaborative expectations of the position. She demonstrates deep React/TypeScript expertise, a track record of mentoring, and direct open-source experience.',
    pros: [
      'Extensive React and TypeScript experience at high-scale companies',
      'Proven mentorship and leadership within engineering teams',
      'Open source contributions directly relevant to the stack',
      'Strong design system background aligns with our needs',
    ],
    cons: [
      'No explicit testing framework experience mentioned beyond Playwright',
      'Limited backend exposure — may need support on full-stack tasks',
    ],
  },
};

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

export default function CandidateDetailPage() {
  const { score } = candidate;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Link
        to={`/jobs/${candidate.jobId}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Back to {candidate.jobTitle}
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-violet-100 text-violet-700 font-semibold text-lg flex items-center justify-center">
            {candidate.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{candidate.name}</h1>
            <p className="text-sm text-gray-400 mt-0.5">Added {candidate.addedAt}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          Re-score
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Summary</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{score.summary}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Score Breakdown</h2>
            <div className="space-y-4">
              {[
                { label: 'Skills Match', value: score.skills },
                { label: 'Experience', value: score.experience },
                { label: 'Culture Fit', value: score.culture },
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

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">CV</h2>
            <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono bg-gray-50 rounded-lg p-4 leading-relaxed">
              {candidate.cvText}
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-xs font-medium text-gray-500 mb-3">Overall Score</p>
            <p className={`text-5xl font-bold ${scoreRingColor(score.overall)}`}>{score.overall}</p>
            <p className="text-xs text-gray-400 mt-1">out of 100</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Applied For</h2>
            <Link
              to={`/jobs/${candidate.jobId}`}
              className="text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors"
            >
              {candidate.jobTitle}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
