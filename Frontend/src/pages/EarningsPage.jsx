import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const EarningsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const jobs = [
    {
      id: 'BK-001',
      type: 'Deep Kitchen Sanitization',
      client: 'Priya Sharma',
      location: 'Bandra West, Mumbai',
      date: 'Today',
      time: '09:00 AM – 12:30 PM',
      status: 'ongoing',
      icon: 'cleaning_services',
      earning: '₹1,200',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 'BK-002',
      type: 'AC Repair & Service',
      client: 'Vikram Singh',
      location: 'Powai, Mumbai',
      date: 'Tomorrow',
      time: '11:00 AM',
      status: 'scheduled',
      icon: 'ac_unit',
      earning: '₹850',
      color: 'bg-cyan-100 text-cyan-600',
    },
    {
      id: 'BK-003',
      type: 'Sofa Dry Cleaning',
      client: 'Arjun Patel',
      location: 'Juhu Scheme, Mumbai',
      date: 'Today',
      time: '04:30 PM',
      status: 'scheduled',
      icon: 'chair',
      earning: '₹1,200',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 'BK-004',
      type: 'Full House Plumbing',
      client: 'Meera Kapoor',
      location: 'Andheri West, Mumbai',
      date: 'Apr 26',
      time: '10:00 AM – 02:00 PM',
      status: 'completed',
      icon: 'plumbing',
      earning: '₹2,100',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      id: 'BK-005',
      type: 'Electrical Panel Inspection',
      client: 'Rohit Mehta',
      location: 'Chembur, Mumbai',
      date: 'Apr 24',
      time: '01:00 PM – 03:30 PM',
      status: 'completed',
      icon: 'bolt',
      earning: '₹950',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      id: 'BK-006',
      type: 'Lawn Manicure & Edge',
      client: 'David Chen',
      location: 'Hiranandani, Powai',
      date: 'Apr 22',
      time: '09:00 AM – 11:00 AM',
      status: 'completed',
      icon: 'grass',
      earning: '₹600',
      color: 'bg-green-100 text-green-600',
    },
  ];

  const statusConfig = {
    ongoing:   { label: 'Ongoing',   pill: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500 animate-pulse' },
    scheduled: { label: 'Scheduled', pill: 'bg-amber-100 text-amber-700',  dot: 'bg-amber-400' },
    completed: { label: 'Completed', pill: 'bg-green-100 text-green-700',  dot: 'bg-green-500' },
  };

  const filtered = activeTab === 'all' ? jobs : jobs.filter(j => j.status === activeTab);

  const totalEarnings = jobs
    .filter(j => j.status === 'completed')
    .reduce((sum, j) => sum + parseInt(j.earning.replace(/[^\d]/g, '')), 0);

  return (
    <DashboardLayout activeRoute="earnings" role="worker">
      <div className="max-w-6xl mx-auto animate-page-fade-in px-4">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black font-headline text-on-surface mb-3 tracking-tight">My Bookings</h1>
            <p className="text-on-surface-variant text-lg">Track all your jobs, earnings, and upcoming schedule.</p>
          </div>
          {/* Total Earnings Summary */}
          <div className="bg-primary-container rounded-[2rem] px-10 py-6 flex flex-col items-center">
            <p className="text-[10px] font-black text-on-primary-container/60 uppercase tracking-[0.2em] mb-1">Total Earned</p>
            <p className="text-4xl font-black font-headline text-primary">
              ₹{totalEarnings.toLocaleString()}
            </p>
          </div>
        </header>

        {/* Filter Tabs */}
        <div className="flex bg-surface-container-low p-1.5 rounded-2xl mb-10 w-fit">
          {['all', 'ongoing', 'scheduled', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-7 py-2.5 rounded-xl text-sm font-black capitalize transition-all ${activeTab === tab ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        <div className="flex flex-col gap-5">
          {filtered.map((job) => {
            const s = statusConfig[job.status];
            return (
              <div key={job.id} className="bg-surface-container-low rounded-[2.5rem] transition-all overflow-hidden flex group">
                {/* Left 80% */}
                <div className="flex-[4] p-8 flex items-center gap-7">
                  {/* Icon */}
                  <div className={`w-16 h-16 min-w-16 rounded-2xl flex items-center justify-center ${job.color.split(' ')[0]} group-hover:scale-110 transition-transform`}>
                    <span className={`material-symbols-outlined text-3xl ${job.color.split(' ')[1]}`}>{job.icon}</span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-black font-headline text-on-surface">{job.type}</h3>
                      {/* Status Pill */}
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${s.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
                        {s.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-on-surface-variant">
                      <span className="flex items-center gap-1.5 font-bold">
                        <span className="material-symbols-outlined text-base">person</span>
                        {job.client}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="material-symbols-outlined text-base">location_on</span>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="material-symbols-outlined text-base">calendar_today</span>
                        {job.date} • {job.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right 20% — Earnings */}
                <div className="flex-1 bg-surface-container-high flex flex-col items-center justify-center py-6 px-4 min-w-[140px]">
                  <p className="text-[10px] font-black text-on-surface-variant/50 uppercase tracking-[0.2em] mb-2">Earnings</p>
                  <p className="text-3xl font-black font-headline text-primary leading-none">{job.earning}</p>
                  {job.status === 'completed' && (
                    <span className="mt-3 text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">Paid</span>
                  )}
                  {job.status === 'ongoing' && (
                    <span className="mt-3 text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">In Progress</span>
                  )}
                  {job.status === 'scheduled' && (
                    <span className="mt-3 text-[10px] font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest">Pending</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center text-center bg-surface-container-low rounded-[4rem] border-4 border-dashed border-outline-variant/20 mt-4">
            <span className="material-symbols-outlined text-8xl text-on-surface-variant/10 mb-6">work_history</span>
            <h3 className="text-3xl font-black text-on-surface mb-2 font-headline">No Jobs Found</h3>
            <p className="text-on-surface-variant text-lg">Try switching tabs to see your bookings.</p>
          </div>
        )}

        <div className="h-20"></div>
      </div>
    </DashboardLayout>
  );
};

export default EarningsPage;
