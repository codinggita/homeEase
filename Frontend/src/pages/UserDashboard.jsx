import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background p-8 font-body">
      <div className="max-w-4xl mx-auto bg-surface-container-low rounded-xl p-8 shadow-sm">
        <h1 className="text-3xl font-headline font-bold text-on-surface mb-4">Welcome, {user.name || user.email}!</h1>
        <p className="text-on-surface-variant mb-8">This is your User Dashboard ("I need help").</p>
        <button 
          onClick={handleLogout}
          className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold hover:shadow-md transition-shadow"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
