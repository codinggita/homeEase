import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import Input from '../components/Input';

const Card = ({ children, className = '', style = {} }) => (
  <div className={`rounded-[2.5rem] p-8 ${className}`} style={style}>
    {children}
  </div>
);

const USER_FAQS = [
  { q: 'How do I cancel a booking?', a: 'Go to My Bookings, select the booking you want to cancel, and click the "Cancel" button. Cancellations are free up to 2 hours before service.' },
  { q: 'How are workers verified?', a: 'All HomeEase workers go through a background check, ID verification, and skill assessment before being listed on the platform.' },
  { q: 'What if I am unhappy with the service?', a: 'You can raise a query below or call our support line. We offer a satisfaction guarantee and will re-dispatch a worker if needed.' },
  { q: 'When will the worker arrive?', a: 'For standard bookings the worker arrives at your scheduled time. For emergency bookings, the ETA is shown on the confirmation screen.' },
];

const WORKER_FAQS = [
  { q: 'How do I accept a job request?', a: 'Go to the Job Requests page. You can review the details and click "Accept Job" to add it to your schedule.' },
  { q: 'When do I get paid for a completed job?', a: 'Payments are typically processed within 24-48 hours after the customer confirms the job is completed.' },
  { q: 'What should I do if I am running late?', a: 'Use the chat feature in Messages to inform the customer immediately. Maintaining good communication helps your rating.' },
  { q: 'How is my professional rating calculated?', a: 'Your rating is the average of all customer reviews. High ratings improve your visibility and chances of getting more jobs.' },
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden transition-all" style={{ backgroundColor: '#efeee8' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group transition-colors"
        style={{ backgroundColor: 'transparent' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <span className="font-bold text-base" style={{ color: '#111827' }}>{q}</span>
        <span
          className="material-symbols-outlined transition-transform duration-300"
          style={{ color: open ? '#a33f00' : '#6b7280', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          expand_more
        </span>
      </button>
      {open && (
        <div
          className="px-6 py-5 text-base leading-relaxed animate-page-fade-in"
          style={{ backgroundColor: 'rgba(0,0,0,0.04)', color: '#374151', borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          {a}
        </div>
      )}
    </div>
  );
};

const USER_ISSUE_TYPES = ['Booking Issue', 'Worker Complaint', 'Payment Issue', 'Cancellation', 'Other'];
const WORKER_ISSUE_TYPES = ['Payout Issue', 'App Technical Problem', 'Customer Dispute', 'Schedule Change', 'Other'];

const HelpPage = () => {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const role = userData?.userType === 'want_to_help' ? 'worker' : 'user';

  const faqs = role === 'worker' ? WORKER_FAQS : USER_FAQS;
  const issueTypes = role === 'worker' ? WORKER_ISSUE_TYPES : USER_ISSUE_TYPES;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!issueType) errs.issueType = 'Please select an issue type';
    if (!description.trim() || description.trim().length < 10) errs.description = 'Please describe your issue (min 10 characters)';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
    setIssueType('');
    setDescription('');
    setErrors({});
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <DashboardLayout activeRoute="help">
      <div className="px-4 py-10 animate-page-fade-in space-y-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black font-headline tracking-tight" style={{ color: '#111827' }}>Help Center</h1>
          <p className="text-lg mt-3" style={{ color: '#6b7280' }}>Personalized support for your {role} journey.</p>
        </div>

        {/* Card 1: Common Questions */}
        <Card style={{ backgroundColor: '#f5f4ee' }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(163,63,0,0.12)' }}>
              <span className="material-symbols-outlined text-xl" style={{ color: '#a33f00', fontVariationSettings: "'FILL' 1" }}>quiz</span>
            </div>
            <h2 className="text-2xl font-black font-headline" style={{ color: '#111827' }}>Common Questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => <FaqItem key={i} {...faq} />)}
          </div>
        </Card>

        {/* Card 2: Direct Support — orange card with forced inline background */}
        <div className="rounded-[2.5rem] p-8" style={{ backgroundColor: '#a33f00' }}>
          <h3 className="text-2xl font-black font-headline mb-3" style={{ color: '#ffffff' }}>Direct Support</h3>
          <p className="mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>Need immediate assistance? Our team is available 9 AM – 8 PM, Mon–Sat.</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-3xl" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>Call Support</p>
              <p className="text-2xl font-black" style={{ color: '#ffffff' }}>+91 98765 43210</p>
            </div>
            <button
              onClick={() => window.open('tel:+919876543210')}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-black text-sm shadow-lg transition-colors"
              style={{ backgroundColor: '#ffffff', color: '#a33f00' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
              Call Now
            </button>
          </div>
        </div>

        {/* Card 3: Raise a Query */}
        <Card style={{ backgroundColor: '#f5f4ee' }}>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(163,63,0,0.12)' }}>
              <span className="material-symbols-outlined text-xl" style={{ color: '#a33f00', fontVariationSettings: "'FILL' 1" }}>contact_support</span>
            </div>
            <h2 className="text-2xl font-black font-headline" style={{ color: '#111827' }}>Raise a Query</h2>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center animate-page-fade-in rounded-3xl" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.15)' }}>
                <span className="material-symbols-outlined text-4xl" style={{ color: '#16a34a', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div>
                <p className="font-black text-2xl font-headline tracking-tight" style={{ color: '#111827' }}>Query Submitted!</p>
                <p className="text-base mt-1" style={{ color: '#6b7280' }}>Our support team will reach out within 24 hours.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex flex-col gap-2.5">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] ml-1" style={{ color: '#374151' }}>Issue Type</label>
                <select
                  value={issueType}
                  onChange={(e) => { setIssueType(e.target.value); setErrors(p => ({ ...p, issueType: undefined })); }}
                  className="w-full border-none rounded-[1.5rem] py-4 px-6 text-sm focus:outline-none focus:ring-4 transition-all duration-300"
                  style={{
                    backgroundColor: '#efeee8',
                    color: '#1f2937',
                    boxShadow: errors.issueType ? '0 0 0 2px rgba(170,55,28,0.4)' : 'none'
                  }}
                >
                  <option value="">Select issue type</option>
                  {issueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.issueType && <p className="text-[10px] font-black uppercase tracking-wider mt-1 ml-4" style={{ color: '#aa371c' }}>{errors.issueType}</p>}
              </div>
              <Input
                id="help-description"
                label="Detailed Description"
                as="textarea"
                rows={5}
                placeholder="Describe your issue in detail so we can help you faster..."
                value={description}
                onChange={(e) => { setDescription(e.target.value); setErrors(p => ({ ...p, description: undefined })); }}
                error={errors.description}
              />
              <div className="flex justify-end pt-2">
                <Button type="submit" icon="send" className="!px-12 !py-4 !rounded-2xl shadow-xl">
                  Submit Query
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Card 4: Policy note */}
        <div className="rounded-[2.5rem] p-6 text-center" style={{ backgroundColor: '#efeee8' }}>
          <span className="material-symbols-outlined text-4xl mb-4 block" style={{ color: 'rgba(0,0,0,0.15)' }}>policy</span>
          <p className="text-sm font-bold" style={{ color: '#6b7280' }}>By submitting a query, you agree to our Support Policy and Terms of Service.</p>
        </div>

        <div className="h-10"></div>
      </div>
    </DashboardLayout>
  );
};

export default HelpPage;
