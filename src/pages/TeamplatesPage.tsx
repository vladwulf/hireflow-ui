import { useState } from 'react';
import { Plus, FileText, ChevronRight, Layers } from 'lucide-react';
import CreateTemplateModal from '../components/CreateTemplateModal';

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

      {modalOpen && <CreateTemplateModal onClose={() => setModalOpen(false)} />}

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

            <div className="flex items-center justify-end pt-4 border-t border-gray-100">
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
