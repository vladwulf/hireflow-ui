import { useParams, Link } from 'react-router';
import Markdown from 'react-markdown';
import { ArrowLeft, Tag, Sparkles } from 'lucide-react';
import { useGetTemplate } from '../hooks/useGetTemplate';

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
  const { data: template, isLoading, isError } = useGetTemplate(uuid ?? '');

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
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
            <Sparkles size={14} className="shrink-0" />
            Generating template with AI — this may take a moment on first load…
          </div>
          <div className="mt-2 flex flex-col gap-2">
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

      {template && (
        <>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-semibold text-gray-900">{template.name}</h1>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[template.category] ?? 'bg-gray-100 text-gray-600'}`}>
              {template.category}
            </span>
          </div>

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

          <div className="bg-white border border-gray-200 rounded-xl p-8 prose prose-sm prose-gray max-w-none">
            {template.template ? (
              <Markdown>{template.template}</Markdown>
            ) : (
              <p className="text-gray-400 text-sm">No template content available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
