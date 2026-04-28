import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const JobRequestsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const requests = [
    {
      id: 'REQ-101',
      type: 'Emergency Pipe Leak',
      client: 'Sarah Mitchell',
      tag: 'Verified Resident',
      location: '1.2 miles away',
      time: 'ASAP',
      price: '₹850 Est.',
      icon: 'plumbing',
      urgent: true,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      id: 'REQ-102',
      type: 'Lawn Manicure & Edge',
      client: 'David Chen',
      tag: 'Monthly Subscriber',
      location: '4.5 miles away',
      time: 'Tomorrow, 10:00 AM',
      price: '₹1,200 Fixed',
      icon: 'grass',
      urgent: false,
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 'REQ-103',
      type: 'Deep Kitchen Sanitization',
      client: 'Priya Sharma',
      tag: 'Premium Member',
      location: '3.2 miles away',
      time: 'Friday, 09:00 AM',
      price: '₹1,200 Fixed',
      icon: 'cleaning_services',
      urgent: false,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 'REQ-104',
      type: 'Emergency Electrical Fix',
      client: 'John Doe',
      tag: 'New Client',
      location: '0.5 miles away',
      time: 'ASAP',
      price: '₹1,500 Est.',
      icon: 'bolt',
      urgent: true,
      color: 'bg-yellow-100 text-yellow-600',
    },
  ];

  const filtered =
    activeTab === 'all'
      ? requests
      : activeTab === 'emergency'
      ? requests.filter((r) => r.urgent)
      : requests.filter((r) => !r.urgent);

  return (
    <DashboardLayout activeRoute="requests" role="worker">
      <div className="animate-page-fade-in max-w-7xl mx-auto px-4">
        
        {/* ── HEADER ── */}
        <header className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Active Status • Mumbai, MH</span>
          </div>
          <h1 className="text-5xl font-black font-headline text-on-surface mb-3 tracking-tight leading-tight">
            New <span className="text-primary italic">Opportunities</span>
          </h1>
          <p className="text-on-surface-variant text-sm leading-relaxed max-w-2xl">
            There are <span className="font-black text-on-surface">{requests.length} high-priority</span> service requests near you.
            Review the details below to accept your next task.
          </p>
        </header>

        {/* ── TOP STATS ROW (Today's Potential & Pro Tip) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Today's Potential */}
          <div className="bg-[#a33f00] rounded-[2.5rem] p-8 flex flex-col justify-center">
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Today's Potential</p>
            <p className="text-5xl font-black text-white font-headline mb-3 leading-none">₹3,550</p>
            <div className="flex items-center gap-2 text-white/70 text-sm font-bold">
              <span className="material-symbols-outlined text-base text-green-300">trending_up</span>
              <span>15% higher than last Tuesday</span>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-green-50 border border-green-100 rounded-[2.5rem] p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600 text-xl">lightbulb</span>
              </div>
              <h3 className="font-black text-on-surface text-lg">Pro Tip</h3>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Homeowners in the <span className="font-bold text-on-surface">Pearl District</span> are currently looking for plumbing and electrical services.
            </p>
          </div>
        </div>

        {/* ── FILTER TABS ── */}
        <div className="flex bg-surface-container-low p-1.5 rounded-2xl mb-8 w-fit">
          {[
            { key: 'all',       label: 'All' },
            { key: 'emergency', label: 'Emergency' },
            { key: 'scheduled', label: 'Scheduled' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${
                activeTab === tab.key
                  ? tab.key === 'emergency'
                    ? 'bg-red-600 text-white'
                    : 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── JOB CARDS GRID (2 per row) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((req) => (
            <div
              key={req.id}
              className="bg-surface-container-low rounded-[2.5rem] p-8 transition-all flex flex-col group h-full"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 min-w-[64px] rounded-full flex items-center justify-center ${req.color.split(' ')[0]} group-hover:scale-110 transition-transform`}>
                    <span className={`material-symbols-outlined text-3xl ${req.color.split(' ')[1]}`}>{req.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-headline text-on-surface leading-tight mb-1">{req.type}</h3>
                    <p className="text-on-surface-variant text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">person</span>
                      <span className="font-bold">{req.client}</span>
                      <span className="mx-1">•</span>
                      <span className="italic font-medium">{req.tag}</span>
                    </p>
                  </div>
                </div>
                {req.urgent && (
                  <span className="bg-red-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0 ml-3">
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>priority_high</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Urgent</span>
                  </span>
                )}
              </div>

              {/* Detail Pills */}
              <div className="flex flex-wrap gap-3 mb-7">
                <div className="bg-surface-container-high px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                  <span className="text-xs font-black text-on-surface-variant uppercase">{req.location}</span>
                </div>
                <div className="bg-surface-container-high px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">payments</span>
                  <span className="text-xs font-black text-on-surface-variant uppercase">{req.price}</span>
                </div>
                <div className="bg-surface-container-high px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">{req.time === 'ASAP' ? 'timer' : 'calendar_today'}</span>
                  <span className="text-xs font-black text-on-surface-variant uppercase">{req.time}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-auto">
                <button className="flex-[3] bg-[#a33f00] text-white py-4 rounded-[2rem] font-black text-base shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3">
                  Accept Job
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </button>
                <button className="flex-1 bg-red-50 text-red-500 hover:bg-red-100 py-4 rounded-[2rem] font-black text-base transition-all flex items-center justify-center">
                  Ignore
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-surface-container-low rounded-[3rem] border-2 border-dashed border-outline-variant/20">
              <span className="material-symbols-outlined text-7xl text-on-surface-variant/10 mb-4">explore</span>
              <h3 className="text-2xl font-black text-on-surface mb-2 font-headline">No Requests Found</h3>
              <p className="text-on-surface-variant">Try switching tabs to see available jobs.</p>
            </div>
          )}
        </div>

        <div className="h-20"></div>
      </div>
    </DashboardLayout>
  );
};

export default JobRequestsPage;
