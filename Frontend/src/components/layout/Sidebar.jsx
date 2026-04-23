import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Calendar, 
  History, 
  UserCircle, 
  Settings, 
  LogOut,
  Briefcase,
  Users,
  ShieldCheck,
  AlertCircle,
  MessageSquare,
  CreditCard,
  HelpCircle
} from 'lucide-react';

const Sidebar = ({ isOpen = true }) => {
  const user = JSON.parse(sessionStorage.getItem('user') || 'null');
  const role = user?.role || 'user';

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.href = '/login';
  };

  const navItems = {
    user: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/user/dashboard' },
      { name: 'Bookings', icon: Calendar, path: '/user/history' },
      { name: 'Earnings', icon: CreditCard, path: '/user/earnings' },
      { name: 'Messages', icon: MessageSquare, path: '/user/messages' },
      { name: 'Settings', icon: Settings, path: '/user/settings' },
    ],
    worker: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/worker/dashboard' },
      { name: 'Job Requests', icon: Briefcase, path: '/worker/requests' },
      { name: 'My Availability', icon: Calendar, path: '/worker/availability' },
      { name: 'Profile', icon: UserCircle, path: '/worker/profile' },
      { name: 'Settings', icon: Settings, path: '/worker/settings' },
    ],
    admin: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
      { name: 'Worker Verification', icon: ShieldCheck, path: '/admin/verification' },
      { name: 'Complaints', icon: AlertCircle, path: '/admin/complaints' },
      { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ],
  };

  const currentNavItems = navItems[role] || navItems.user;

  return (
    <aside 
      className={`fixed left-0 top-0 h-full flex flex-col py-8 bg-surface-container-low w-64 rounded-r-[3rem] shadow-xl z-50 transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20 lg:rounded-r-none'
      }`}
    >
      <div className="px-8 mb-10">
        <Link to="/" className="text-xl font-black text-primary">HomeEase</Link>
      </div>

      <div className="flex-1 flex flex-col gap-2 overflow-y-auto px-2">
        {currentNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              rounded-full px-4 py-3 flex items-center gap-3 transition-all hover:translate-x-1
              ${isActive 
                ? 'bg-primary-container text-primary font-bold' 
                : 'text-on-surface-variant hover:bg-surface-container-high'
              }
            `}
          >
            <item.icon size={22} />
            <span className="font-body text-sm">{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="px-6 mb-8 mt-auto">
        <Link to={role === 'user' ? '/user/listing' : '/worker/availability'}>
          <button className="w-full py-4 bg-primary text-white rounded-full font-bold shadow-lg hover:scale-95 transition-transform">
            {role === 'user' ? 'Book New Service' : 'Update Availability'}
          </button>
        </Link>
      </div>

      <div className="border-t border-outline-variant/15 pt-6 flex flex-col gap-2 px-2">
        <NavLink
          to="/help"
          className="text-on-surface-variant hover:bg-surface-container-high rounded-full px-4 py-3 flex items-center gap-3 transition-transform hover:translate-x-1"
        >
          <HelpCircle size={22} />
          <span className="font-body text-sm">Help Center</span>
        </NavLink>
        <button 
          onClick={handleLogout}
          className="text-on-surface-variant hover:bg-surface-container-high rounded-full px-4 py-3 flex items-center gap-3 transition-transform hover:translate-x-1 w-full text-left"
        >
          <LogOut size={22} />
          <span className="font-body text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;