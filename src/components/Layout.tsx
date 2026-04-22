import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { LayoutDashboard, Briefcase, FileText, Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/templates', label: 'Templates', icon: FileText },
];

function SidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  return (
    <>
      <div className="px-6 py-5 border-b border-gray-200">
        <span className="text-lg font-semibold text-violet-600 tracking-tight">HireFlow</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-violet-50 text-violet-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-60 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          className="absolute top-4 right-3 p-1 rounded-md text-gray-400 hover:text-gray-600"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
        <SidebarContent onNavClick={() => setMobileOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 bg-white border-r border-gray-200 flex-col shrink-0">
        <SidebarContent />
      </aside>

      <div className="flex flex-col flex-1 min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="p-1 rounded-md text-gray-500 hover:text-gray-700"
          >
            <Menu size={20} />
          </button>
          <span className="text-base font-semibold text-violet-600 tracking-tight">HireFlow</span>
        </header>

        <main className="flex-1 overflow-auto pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
