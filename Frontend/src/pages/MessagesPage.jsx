import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';

const MessagesPage = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const role = userData?.userType === 'want_to_help' ? 'worker' : 'user';

  const workerChats = [
    { id: 1, name: 'Priya Sharma', lastMsg: 'I have shared the location, please reach by 10 AM.', time: '10:30 AM', unread: true },
    { id: 2, name: 'Vikram Singh', lastMsg: 'The AC is working perfectly now, thank you!', time: 'Yesterday', unread: false },
    { id: 3, name: 'Meera Kapoor', lastMsg: 'Can you check the kitchen sink as well?', time: '2 days ago', unread: false },
  ];

  return (
    <DashboardLayout activeRoute="messages">
      <div className="max-w-5xl mx-auto px-4 py-10 animate-page-fade-in">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-on-surface font-headline tracking-tight">Messages</h1>
          <p className="text-on-surface-variant text-base mt-2">
            {role === 'worker' ? 'Manage your conversations with customers' : 'Stay updated on your bookings and workers'}
          </p>
        </div>

        {role === 'worker' ? (
          /* Worker Chat List */
          <div className="space-y-4">
            {workerChats.map((chat) => (
              <div 
                key={chat.id} 
                className="bg-surface-container-low rounded-3xl p-5 flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-5 flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-full bg-primary-container/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-on-surface text-lg truncate">{chat.name}</h3>
                      {chat.unread && <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>}
                    </div>
                    <p className={`text-sm truncate ${chat.unread ? 'text-on-surface font-semibold' : 'text-on-surface-variant'}`}>
                      {chat.lastMsg}
                    </p>
                  </div>
                </div>
                <div className="text-right ml-4 shrink-0">
                  <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest mb-2 italic">SENT</p>
                  <p className="text-xs font-bold text-on-surface-variant">{chat.time}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* User Empty State */
          <div className="bg-surface-container-low rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center gap-6">
            <div className="w-24 h-24 bg-primary-container/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-primary/40">chat_bubble</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-on-surface font-headline tracking-tight">No Messages Yet</h2>
              <p className="text-base text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                You'll see updates here once you book a service. Your professional help will reach out through this inbox.
              </p>
            </div>
            <Button icon="add" onClick={() => navigate('/booking')} className="mt-4 !px-10 !py-4 !rounded-2xl shadow-xl hover:shadow-primary/20">
              Book a Service
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
