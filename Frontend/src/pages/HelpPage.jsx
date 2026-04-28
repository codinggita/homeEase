import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import Input from '../components/Input';

const Card = ({ children, className = '' }) => (
  <div className={`bg-surface-container-low rounded-[2.5rem] p-8 ${className}`}>
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
    <div className="rounded-2xl overflow-hidden transition-all bg-surface-container">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-black/5 transition-colors text-left group"
      >
        <span className="font-bold text-base text-on-surface group-hover:text-primary transition-colors">{q}</span>
        <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${open ? 'rotate-180 text-primary' : ''}`}>
          expand_more
        </span>
      </button>
      {open && (
        <div className="px-6 py-5 bg-black/5 text-base text-on-surface-variant leading-relaxed border-t border-on-surface/5 animate-page-fade-in">
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
      <div className="max-w-6xl mx-auto px-4 py-10 animate-page-fade-in space-y-12">
        {/* Header */}
        <div className="text-center md:text-left mb-16">
          <h1 className="text-5xl font-black text-on-surface font-headline tracking-tight">Help Center</h1>
          <p className="text-on-surface-variant text-lg mt-3">Personalized support for your {role} journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT: FAQ */}
          <div className="space-y-8">
            <Card>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>quiz</span>
                </div>
                <h2 className="text-2xl font-black text-on-surface font-headline">Common Questions</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {faqs.map((faq, i) => <FaqItem key={i} {...faq} />)}
              </div>
            </Card>

            <Card className="bg-primary text-on-primary">
              <h3 className="text-2xl font-black font-headline mb-4">Direct Support</h3>
              <p className="text-on-primary/80 mb-6">Need immediate assistance? Our team is available 9 AM – 8 PM, Mon–Sat.</p>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/10 p-6 rounded-3xl">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-primary/50 mb-1">Call Support</p>
                  <p className="text-2xl font-black">+91 98765 43210</p>
                </div>
                <Button variant="secondary" icon="call" onClick={() => window.open('tel:+919876543210')} className="!px-8 !py-3 !rounded-xl shadow-lg">
                  Call Now
                </Button>
              </div>
            </Card>
          </div>

          {/* RIGHT: Raise a Query */}
          <div className="space-y-8">
            <Card>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>contact_support</span>
                </div>
                <h2 className="text-2xl font-black text-on-surface font-headline">Raise a Query</h2>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center animate-page-fade-in bg-surface-container/30 rounded-3xl">
                  <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-success text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <div>
                    <p className="font-black text-on-surface text-2xl font-headline tracking-tight">Query Submitted!</p>
                    <p className="text-base text-on-surface-variant mt-1">Our support team will reach out within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 gap-8">
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[11px] font-black text-on-surface/50 uppercase tracking-[0.2em] ml-1">Issue Type</label>
                      <select
                        value={issueType}
                        onChange={(e) => { setIssueType(e.target.value); setErrors(p => ({ ...p, issueType: undefined })); }}
                        className={`w-full bg-surface-container border-none rounded-[1.5rem] py-4 px-6 text-sm text-on-surface focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ${errors.issueType ? 'ring-2 ring-error/50' : ''}`}
                      >
                        <option value="">Select issue type</option>
                        {issueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.issueType && <p className="text-[10px] text-error font-black uppercase tracking-wider mt-1 ml-4">{errors.issueType}</p>}
                    </div>
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
                    <Button type="submit" icon="send" className="!px-12 !py-4 !rounded-2xl shadow-xl hover:shadow-primary/20">
                      Submit Query
                    </Button>
                  </div>
                </form>
              )}
            </Card>

            <Card className="bg-surface-container text-center">
               <span className="material-symbols-outlined text-4xl text-on-surface-variant/20 mb-4">policy</span>
               <p className="text-sm font-bold text-on-surface-variant">By submitting a query, you agree to our Support Policy and Terms of Service.</p>
            </Card>
          </div>

        </div>
        <div className="h-20"></div>
      </div>
    </DashboardLayout>
  );
};

export default HelpPage;
