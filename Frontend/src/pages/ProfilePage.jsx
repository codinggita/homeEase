import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import Input from '../components/Input';

const Card = ({ children, className = '' }) => (
  <div className={`bg-surface-container-low rounded-[2.5rem] p-8 ${className}`}>
    {children}
  </div>
);

const ProfilePage = () => {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const role = userData?.userType === 'want_to_help' ? 'worker' : 'user';
  const saved = JSON.parse(localStorage.getItem('homeease_profile') || '{}');

  const [editing, setEditing]       = useState(false);
  const [saved_ok, setSavedOk]      = useState(false);
  const [pwSaved, setPwSaved]       = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  // Profile State
  const [name,    setName]    = useState(saved.name    || userData.name || '');
  const [phone,   setPhone]   = useState(saved.phone   || '');
  const [email,   setEmail]   = useState(saved.email   || userData.email || '');
  const [address, setAddress] = useState(saved.address || localStorage.getItem('userAddress') || '');
  const [age,     setAge]     = useState(saved.age     || '');
  const [gender,  setGender]  = useState(saved.gender  || '');

  // Password State
  const [curPw,    setCurPw]    = useState('');
  const [newPw,    setNewPw]    = useState('');
  const [confPw,   setConfPw]   = useState('');
  const [pwErrors, setPwErrors] = useState({});

  const handleSave = () => {
    const profile = { name, phone, email, address, age, gender };
    localStorage.setItem('homeease_profile', JSON.stringify(profile));
    localStorage.setItem('userAddress', address);
    setEditing(false);
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 3000);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    const errs = {};
    if (!curPw) errs.curPw = 'Enter current password';
    if (newPw.length < 6) errs.newPw = 'Min 6 characters required';
    if (newPw !== confPw) errs.confPw = 'Passwords mismatch';
    if (Object.keys(errs).length) { setPwErrors(errs); return; }
    setPwErrors({});
    setCurPw(''); setNewPw(''); setConfPw('');
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 3000);
  };

  return (
    <DashboardLayout activeRoute="profile">
      <div className="max-w-7xl mx-auto px-4 py-8 animate-page-fade-in space-y-8">
        
        {/* ── PROFILE HEADER CARD ── */}
        <div className="relative bg-surface-container-low rounded-[3rem] overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 md:h-64 relative overflow-hidden">
            <img 
              src="/c:/Users/91915/.gemini/antigravity/brain/3f70a494-1bd6-4bd0-9286-bfac1fb1804c/profile_cover_gradient_1777387780489.png" 
              className="w-full h-full object-cover"
              alt="Cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
          </div>
          
          <div className="px-8 pb-10 -mt-20 relative z-10 flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left w-full md:w-auto">
              <div className="relative group">
                <img 
                  src="/c:/Users/91915/.gemini/antigravity/brain/3f70a494-1bd6-4bd0-9286-bfac1fb1804c/default_avatar_profile_1777387759301.png" 
                  className="w-40 h-40 rounded-[2.5rem] object-cover border-8 border-surface-container-low shadow-xl"
                  alt="Profile"
                />
                <button className="absolute bottom-4 right-4 bg-primary text-on-primary p-2.5 rounded-2xl shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">photo_camera</span>
                </button>
              </div>
              <div className="pb-4">
                <h1 className="text-4xl font-black text-on-surface font-headline tracking-tight">{name || 'Unnamed User'}</h1>
                <p className="text-on-surface-variant font-bold flex items-center justify-center md:justify-start gap-2 mt-1">
                  <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {role === 'worker' ? 'verified_user' : 'person'}
                  </span>
                  {role === 'worker' ? 'Verified Professional' : 'Premium Member'}
                  <span className="mx-2 opacity-20 text-on-surface">•</span>
                  <span className="text-xs uppercase tracking-widest">{email}</span>
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 pb-4">
              {!editing ? (
                <Button variant="secondary" icon="edit" onClick={() => setEditing(true)} className="!px-10 !py-4 !rounded-2xl shadow-lg hover:scale-105 transition-all">
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setEditing(false)} className="!px-8">Cancel</Button>
                  <Button icon="save" onClick={handleSave} className="!px-10 shadow-xl hover:shadow-primary/20">Save Changes</Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* Left Column: Stats & Info */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            
            {/* Role-Specific Stats */}
            {role === 'worker' ? (
              <Card className="bg-primary text-on-primary overflow-hidden relative border-none">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <p className="text-on-primary/60 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Total Earnings</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-5xl font-black font-headline">₹1,42,850</h3>
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-primary/60 mb-1">Work Status</p>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-300' : 'bg-white/30'} animate-pulse`}></span>
                      <span className="text-xs font-black uppercase tracking-widest">{isAvailable ? 'Available Now' : 'Busy'}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsAvailable(!isAvailable)}
                    className="bg-white/10 hover:bg-white/20 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                  >
                    Toggle
                  </button>
                </div>
              </Card>
            ) : (
              <Card className="bg-primary text-on-primary border-none">
                <p className="text-on-primary/60 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Membership Level</p>
                <h3 className="text-4xl font-black font-headline">Gold Tier</h3>
                <p className="text-sm mt-2 opacity-80">You've saved ₹4,200 on service charges this month.</p>
                <div className="mt-8 pt-8 border-t border-on-primary/10">
                  <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-2xl text-sm font-black transition-colors">
                    View Benefits
                  </button>
                </div>
              </Card>
            )}

            {/* Performance/Activity Card */}
            <Card>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {role === 'worker' ? 'star' : 'history'}
                  </span>
                </div>
                <h2 className="text-xl font-black text-on-surface font-headline">{role === 'worker' ? 'Performance' : 'Service History'}</h2>
              </div>
              
              {role === 'worker' ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Rating</p>
                      <p className="text-3xl font-black text-on-surface font-headline">4.9<span className="text-lg text-on-surface-variant ml-1">/ 5.0</span></p>
                    </div>
                    <div className="flex text-amber-500">
                      {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                    </div>
                  </div>
                  <div className="bg-surface-container rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-on-surface-variant">Global Rank</span>
                    <span className="text-sm font-black text-primary">#4 in Mumbai</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl">
                    <span className="text-sm font-bold text-on-surface">Total Bookings</span>
                    <span className="text-xl font-black text-primary">24</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl">
                    <span className="text-sm font-bold text-on-surface">Favorite Worker</span>
                    <span className="text-sm font-black text-primary">Sarah J.</span>
                  </div>
                </div>
              )}
            </Card>

            {/* Quick Support Link */}
            <div className="p-8 bg-surface-container-low rounded-[2.5rem] text-center border-2 border-dashed border-outline-variant/20">
               <p className="text-sm font-bold text-on-surface-variant mb-4">Need technical help?</p>
               <Button variant="ghost" icon="help_center" className="w-full !rounded-2xl" onClick={() => window.location.href='/help'}>
                 Open Help Center
               </Button>
            </div>
          </div>

          {/* Right Column: Edit Forms */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* Banner/Success Message */}
            {saved_ok && (
              <div className="bg-success/10 text-success rounded-[2rem] p-6 flex items-center gap-4 animate-page-fade-in border border-success/20">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <p className="font-black text-sm uppercase tracking-widest">Profile data synced successfully</p>
              </div>
            )}

            {/* Basic Info Section */}
            <Card>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                </div>
                <h2 className="text-2xl font-black text-on-surface font-headline tracking-tight">Basic Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <Input id="p-name" label="Full Name" icon="badge" value={name}
                    disabled={!editing} onChange={e => setName(e.target.value)} placeholder="Alex Rivers"
                  />
                </div>
                <Input id="p-age" label="Your Age" type="number" icon="cake" value={age}
                  disabled={!editing} onChange={e => setAge(e.target.value)} placeholder="28"
                />
                <div className="flex flex-col gap-2.5">
                  <label className="text-[11px] font-black text-on-surface/50 uppercase tracking-[0.2em] ml-1">Gender</label>
                  <select 
                    value={gender} disabled={!editing} onChange={e => setGender(e.target.value)}
                    className="w-full bg-surface-container border-none rounded-[1.5rem] py-4 px-6 text-sm text-on-surface focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 disabled:opacity-50 grayscale cursor-not-allowed"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Contact & Professional Info Section */}
            <Card>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {role === 'worker' ? 'engineering' : 'contact_phone'}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-on-surface font-headline tracking-tight">
                  {role === 'worker' ? 'Professional Details' : 'Contact Details'}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input id="p-phone" label="Phone Number" icon="phone" value={phone}
                  disabled={!editing} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210"
                />
                <Input id="p-email" label="Email Address" icon="email" value={email}
                  disabled={!editing} onChange={e => setEmail(e.target.value)} placeholder="alex@example.com"
                />
                <div className="md:col-span-2">
                  <Input id="p-address" label={role === 'worker' ? "Primary Service Area" : "Home Address"} icon="location_on" value={address}
                    disabled={!editing} onChange={e => setAddress(e.target.value)} placeholder="4th Floor, Skyline Towers, Mumbai"
                  />
                </div>
                {role === 'worker' && (
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-black text-on-surface/50 uppercase tracking-[0.2em] ml-1 mb-2.5 block">Skills & Expertise</label>
                    <div className="flex flex-wrap gap-3 p-6 bg-surface-container rounded-[1.5rem]">
                      {['Cleaning', 'AC Repair', 'Plumbing', 'Electrical'].map(skill => (
                        <span key={skill} className="bg-primary-container/40 text-on-primary-container px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                          {skill}
                        </span>
                      ))}
                      {editing && (
                        <button className="w-9 h-9 rounded-full border-2 border-dashed border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all">
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Full Width Security Section */}
          <div className="col-span-12">
            <Card>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <h2 className="text-2xl font-black text-on-surface font-headline tracking-tight">Security & Privacy</h2>
              </div>
              
              <form onSubmit={handlePasswordUpdate} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Input id="p-curpw" label="Current Password" icon="key" type="password"
                    value={curPw} onChange={e => { setCurPw(e.target.value); setPwErrors(p => ({ ...p, curPw: undefined })); }}
                    error={pwErrors.curPw} placeholder="••••••••"
                  />
                  <Input id="p-newpw" label="New Password" icon="lock_reset" type="password"
                    value={newPw} onChange={e => { setNewPw(e.target.value); setPwErrors(p => ({ ...p, newPw: undefined })); }}
                    error={pwErrors.newPw} placeholder="••••••••"
                  />
                  <Input id="p-confpw" label="Confirm Password" icon="verified" type="password"
                    value={confPw} onChange={e => { setConfPw(e.target.value); setPwErrors(p => ({ ...p, confPw: undefined })); }}
                    error={pwErrors.confPw} placeholder="••••••••"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" variant="secondary" icon="shield_lock" className="!px-12 !py-4 !rounded-2xl shadow-xl w-full md:w-auto">
                    Update Credentials
                  </Button>
                </div>
              </form>
            </Card>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
