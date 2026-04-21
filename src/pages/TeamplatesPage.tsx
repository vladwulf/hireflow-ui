import { useState } from 'react';
import { Plus, FileText, ChevronRight, Layers, X } from 'lucide-react';

const templates = [
  {
    id: '1',
    name: 'Software Engineer',
    department: 'Engineering',
    description: 'For backend, frontend, and full-stack engineering roles.',
    sections: ['Overview', 'Responsibilities', 'Requirements', 'Nice to Have', 'Benefits'],
    usageCount: 14,
  },
  {
    id: '2',
    name: 'Product Manager',
    department: 'Product',
    description: 'For product management and strategy roles.',
    sections: ['Overview', "What You'll Do", 'Requirements', 'Nice to Have', 'Benefits'],
    usageCount: 6,
  },
  {
    id: '3',
    name: 'Designer',
    department: 'Design',
    description: 'For UX, UI, and product design positions.',
    sections: ['Overview', 'Responsibilities', 'Required Skills', 'Portfolio', 'Benefits'],
    usageCount: 4,
  },
  {
    id: '4',
    name: 'Data Analyst',
    department: 'Analytics',
    description: 'For data analysis, BI, and reporting roles.',
    sections: ['Overview', 'Responsibilities', 'Technical Requirements', 'Nice to Have', 'Benefits'],
    usageCount: 3,
  },
  {
    id: '5',
    name: 'Marketing Manager',
    department: 'Marketing',
    description: 'For marketing, growth, and brand management roles.',
    sections: ['Overview', 'Responsibilities', 'Requirements', 'Nice to Have', 'Benefits'],
    usageCount: 2,
  },
  {
    id: '6',
    name: 'Sales Representative',
    department: 'Sales',
    description: 'For sales, account management, and business development.',
    sections: ['Overview', "What You'll Do", 'Requirements', 'Compensation', 'Benefits'],
    usageCount: 1,
  },
];

const departmentColors: Record<string, string> = {
  Engineering: 'bg-violet-50 text-violet-700',
  Product: 'bg-blue-50 text-blue-700',
  Design: 'bg-pink-50 text-pink-700',
  Analytics: 'bg-orange-50 text-orange-700',
  Marketing: 'bg-green-50 text-green-700',
  Sales: 'bg-yellow-50 text-yellow-700',
};

export default function TeamplatesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: persist new template
    setModalOpen(false);
    setName('');
    setDescription('');
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Templates</h1>
          <p className="text-sm text-gray-500 mt-1">{templates.length} job description templates</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <Plus size={16} />
          New Template
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-900">New Template</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Engineer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={3}
                  placeholder="Use a job description you like..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors cursor-pointer"
                >
                  Create Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-violet-200 hover:shadow-sm transition-all cursor-pointer group flex flex-col"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                <FileText size={16} className="text-violet-600" />
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${departmentColors[template.department] ?? 'bg-gray-100 text-gray-600'}`}>
                {template.department}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-gray-900 mb-1">{template.name}</h3>
            <p className="text-xs text-gray-500 mb-4 flex-1">{template.description}</p>

            <div className="mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Layers size={12} className="text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">Sections</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {template.sections.map((section) => (
                  <span key={section} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                    {section}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-400">Used {template.usageCount} times</span>
              <button className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium transition-colors group-hover:gap-1.5 cursor-pointer">
                Use template <ChevronRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
