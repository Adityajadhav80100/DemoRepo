import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleLinks = {
  admin: [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/students', label: 'Manage Students' },
    { to: '/admin/analytics', label: 'Analytics' }
  ],
  teacher: [
    { to: '/teacher', label: 'Dashboard' },
    { to: '/teacher/attendance', label: 'Attendance' },
    { to: '/teacher/marks', label: 'Marks' },
    { to: '/teacher/alerts', label: 'Risk Alerts' }
  ],
  student: [
    { to: '/student', label: 'My Dashboard' },
    { to: '/student/analytics', label: 'My Analytics' }
  ]
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const role = user.role || user?.user?.role;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h1 className="text-lg font-bold mb-8">Smart Student AI</h1>
        <nav className="space-y-3">
          {(roleLinks[role] || []).map((link) => (
            <Link key={link.to} to={link.to} className="block rounded px-3 py-2 hover:bg-slate-800">
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1">
        <header className="bg-white shadow px-6 py-4 flex justify-between">
          <p className="font-medium text-slate-700">Welcome, {user.name || user?.user?.name}</p>
          <button onClick={logout} className="px-3 py-2 rounded bg-red-500 text-white text-sm">
            Logout
          </button>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
