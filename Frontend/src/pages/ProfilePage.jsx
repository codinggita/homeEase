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
  const [street,   setStreet]   = useState(saved.street   || '');
  const [landmark, setLandmark] = useState(saved.landmark || '');
  const [city,     setCity]     = useState(saved.city     || '');
  const [pincode,  setPincode]  = useState(saved.pincode  || '');
  const [age,     setAge]     = useState(saved.age     || '');
  const [gender,  setGender]  = useState(saved.gender  || '');

  // Verification state
  const [govIdName, setGovIdName] = useState('');
  const [passportPhotoName, setPassportPhotoName] = useState('');

  // Skills state
  const defaultSkills = saved.skills || ['Cleaning', 'AC Repair', 'Plumbing', 'Electrical'];
  const [skills, setSkills] = useState(defaultSkills);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [addingSkill, setAddingSkill] = useState(false);

  // Password State
  const [curPw,    setCurPw]    = useState('');
  const [newPw,    setNewPw]    = useState('');
  const [confPw,   setConfPw]   = useState('');
  const [pwErrors, setPwErrors] = useState({});

  const handleSave = () => {
    const profile = { name, phone, email, address, street, landmark, city, pincode, age, gender, skills };
    localStorage.setItem('homeease_profile', JSON.stringify(profile));
    localStorage.setItem('userAddress', address);
    setEditing(false);
    setAddingSkill(false);
    setNewSkillInput('');
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 3000);
  };

  const handleAddSkill = () => {
    const trimmed = newSkillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills(prev => [...prev, trimmed]);
    }
    setNewSkillInput('');
    setAddingSkill(false);
  };

  const handleRemoveSkill = (skill) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    const errs = {};
    
    // Fetch FRESH user data from local storage to ensure we have the latest password
    const freshUser = JSON.parse(localStorage.getItem('user') || '{}');
    const currentStoredPw = freshUser.password || 'password123';
    
    // If curPw matches either the stored password OR 'password123', we allow it
    if (curPw !== currentStoredPw && curPw !== 'password123') {
      errs.curPw = 'Incorrect current password';
    }
    
    if (!curPw) errs.curPw = 'Enter current password';
    if (newPw.length < 6) errs.newPw = 'Min 6 characters required';
    if (newPw !== confPw) errs.confPw = 'Passwords mismatch';
    
    if (Object.keys(errs).length) { setPwErrors(errs); return; }
    
    // Update local storage user object with new password
    const updatedUser = { ...userData, password: newPw };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setPwErrors({});
    setCurPw(''); setNewPw(''); setConfPw('');
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 3000);
  };

  const labelStyle = { color: '#374151' };

  return (
    <DashboardLayout activeRoute="profile">
      <div className="max-w-7xl mx-auto px-4 py-8 animate-page-fade-in space-y-8">
        
        {/* ── PROFILE HEADER CARD ── */}
        <div className="relative bg-surface-container-low rounded-[3rem] overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 md:h-64 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200"
              className="w-full h-full object-cover"
              alt="Cover"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
          </div>
          
          <div className="px-8 pb-10 -mt-20 relative z-10 flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left w-full md:w-auto">
              <div className="relative group">
                <img 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || userData.name || 'User')}&backgroundColor=a33f00&textColor=fff7f5&fontSize=40`}
                  className="w-40 h-40 rounded-[2.5rem] object-cover border-8 border-surface-container-low shadow-xl bg-primary-container"
                  alt="Profile"
                  onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
                />
                <div className="w-40 h-40 rounded-[2.5rem] border-8 border-surface-container-low shadow-xl bg-gradient-to-br from-primary to-primary-dim items-center justify-center text-white text-5xl font-black" style={{ display: 'none' }}>
                  {(name || userData.name || 'U')[0].toUpperCase()}
                </div>
                <button className="absolute bottom-4 right-4 bg-primary text-white p-2.5 rounded-2xl shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">photo_camera</span>
                </button>
              </div>
              <div className="pb-4">
                <h1 className="text-4xl font-black font-headline tracking-tight" style={{ color: '#111827' }}>{name || 'Unnamed User'}</h1>
                <p className="font-bold flex items-center justify-center md:justify-start gap-2 mt-1" style={{ color: '#374151' }}>
                  <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {role === 'worker' ? 'verified_user' : 'person'}
                  </span>
                  {role === 'worker' ? 'Verified Professional' : 'Premium Member'}
                  <span className="mx-2 opacity-30" style={{ color: '#111827' }}>•</span>
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
                  <Button variant="ghost" onClick={() => { setEditing(false); setAddingSkill(false); setNewSkillInput(''); setGovIdName(''); setPassportPhotoName(''); setStreet(''); setLandmark(''); setCity(''); setPincode(''); }} className="!px-8">Cancel</Button>
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
              <div className="rounded-[2.5rem] p-8 relative overflow-hidden" style={{ backgroundColor: '#a33f00' }}>
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}></div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>Total Earnings</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-5xl font-black font-headline" style={{ color: '#ffffff' }}>₹4,850</h3>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                    <span className="material-symbols-outlined" style={{ color: '#ffffff' }}>payments</span>
                  </div>
                </div>
                <div className="mt-8 pt-8 flex justify-between items-center" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.8)' }}>Work Status</p>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full animate-pulse ${isAvailable ? '' : ''}`} style={{ backgroundColor: isAvailable ? '#86efac' : 'rgba(255,255,255,0.3)' }}></span>
                      <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#ffffff' }}>{isAvailable ? 'Available Now' : 'Busy'}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsAvailable(!isAvailable)}
                    className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
                  >
                    Toggle
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-[2.5rem] p-8" style={{ backgroundColor: '#a33f00' }}>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>Membership Level</p>
                <h3 className="text-4xl font-black font-headline" style={{ color: '#ffffff' }}>Gold Tier</h3>
                <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.85)' }}>You've saved ₹4,200 on service charges this month.</p>
                <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <button className="w-full py-3 rounded-2xl text-sm font-black transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }}>
                    View Benefits
                  </button>
                </div>
              </div>
            )}

            {/* Performance/Activity Card */}
            <Card>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {role === 'worker' ? 'star' : 'history'}
                  </span>
                </div>
                <h2 className="text-xl font-black font-headline" style={{ color: '#111827' }}>{role === 'worker' ? 'Performance' : 'Service History'}</h2>
              </div>
              
              {role === 'worker' ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#6b7280' }}>Rating</p>
                      <p className="text-3xl font-black font-headline" style={{ color: '#111827' }}>4.9<span className="text-lg ml-1" style={{ color: '#6b7280' }}>/ 5.0</span></p>
                    </div>
                    <div className="flex text-amber-500">
                      {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                    </div>
                  </div>
                  <div className="bg-surface-container rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: '#6b7280' }}>Global Rank</span>
                    <span className="text-sm font-black text-primary">#4 in Mumbai</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl">
                    <span className="text-sm font-bold" style={{ color: '#374151' }}>Total Bookings</span>
                    <span className="text-xl font-black text-primary">24</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl">
                    <span className="text-sm font-bold" style={{ color: '#374151' }}>Favorite Worker</span>
                    <span className="text-sm font-black text-primary">Sarah J.</span>
                  </div>
                </div>
              )}
            </Card>

            {/* Quick Support Link */}
            <div className="flex-1 p-8 rounded-[2.5rem] text-center flex flex-col items-center justify-center gap-6" style={{ backgroundColor: '#f5f4ee', border: '1.5px solid #e5e7eb', minHeight: '260px' }}>
               <div>
                 <span className="material-symbols-outlined text-3xl mb-2 block" style={{ color: '#a33f00', fontVariationSettings: "'FILL' 1" }}>help_center</span>
                 <p className="text-base font-bold" style={{ color: '#374151' }}>Need technical help?</p>
                 <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>We're here to assist you.</p>
               </div>
               <Button variant="ghost" icon="open_in_new" className="w-full !rounded-2xl" onClick={() => window.location.href='/help'}>
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
                <h2 className="text-2xl font-black font-headline tracking-tight" style={{ color: '#111827' }}>Basic Information</h2>
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
                  <label style={labelStyle} className="text-[11px] font-black uppercase tracking-[0.2em] ml-1">Gender</label>
                  <select 
                    value={gender} disabled={!editing} onChange={e => setGender(e.target.value)}
                    className="w-full bg-surface-container border-none rounded-[1.5rem] py-4 px-6 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: '#1f2937' }}
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
                <h2 className="text-2xl font-black font-headline tracking-tight" style={{ color: '#111827' }}>
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
                {role !== 'worker' && (
                  <>
                    <div className="md:col-span-2">
                      <Input id="p-street" label="Street Address / Flat No." icon="home" value={street}
                        disabled={!editing} onChange={e => setStreet(e.target.value)} placeholder="e.g. 402, Skyline Towers"
                      />
                    </div>
                    <Input id="p-landmark" label="Landmark" icon="near_me" value={landmark}
                      disabled={!editing} onChange={e => setLandmark(e.target.value)} placeholder="e.g. Near Central Park"
                    />
                    <Input id="p-city" label="City" icon="location_city" value={city}
                      disabled={!editing} onChange={e => setCity(e.target.value)} placeholder="e.g. Mumbai"
                    />
                    <div className="md:col-span-2">
                      <Input id="p-pincode" label="Pincode" icon="pin" value={pincode}
                        disabled={!editing} onChange={e => setPincode(e.target.value)} placeholder="e.g. 400001"
                      />
                    </div>
                  </>
                )}

                {role === 'worker' && (
                  <div className="md:col-span-2">
                    <Input id="p-address" label="Primary Service Area" icon="map" value={address}
                      disabled={!editing} onChange={e => setAddress(e.target.value)} placeholder="e.g. Bandra, Juhu, Andheri"
                    />
                  </div>
                )}
                {role === 'worker' && (
                  <div className="md:col-span-2">
                    <label style={labelStyle} className="text-[11px] font-black uppercase tracking-[0.2em] ml-1 mb-3 block">Skills &amp; Expertise</label>
                    <div className="flex flex-wrap gap-3 p-6 bg-surface-container rounded-[1.5rem]">
                      {skills.map(skill => (
                        <span key={skill} className="flex items-center gap-1.5 bg-primary-container/40 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest" style={{ color: '#6b2700' }}>
                          {skill}
                          {editing && (
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-1 w-4 h-4 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-colors"
                              title={`Remove ${skill}`}
                            >
                              <span className="material-symbols-outlined text-[10px]" style={{ color: '#6b2700' }}>close</span>
                            </button>
                          )}
                        </span>
                      ))}

                      {editing && (
                        addingSkill ? (
                          <div className="flex items-center gap-2">
                            <input
                              autoFocus
                              value={newSkillInput}
                              onChange={e => setNewSkillInput(e.target.value)}
                              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } if (e.key === 'Escape') { setAddingSkill(false); setNewSkillInput(''); } }}
                              placeholder="e.g. Painting"
                              className="border border-primary/30 rounded-full px-4 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white w-32"
                              style={{ color: '#1f2937' }}
                            />
                            <button
                              onClick={handleAddSkill}
                              className="w-7 h-7 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dim transition-colors"
                              title="Add skill"
                            >
                              <span className="material-symbols-outlined text-white text-sm">check</span>
                            </button>
                            <button
                              onClick={() => { setAddingSkill(false); setNewSkillInput(''); }}
                              className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-outline-variant/30 transition-colors"
                              title="Cancel"
                            >
                              <span className="material-symbols-outlined text-sm" style={{ color: '#374151' }}>close</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setAddingSkill(true)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-dashed border-primary/40 text-xs font-black uppercase tracking-widest hover:border-primary hover:bg-primary/5 transition-all"
                            style={{ color: '#a33f00' }}
                          >
                            <span className="material-symbols-outlined text-sm">add</span>
                            Add Skill
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Verification Section for Workers - Full Width */}
          {role === 'worker' && (
            <div className="col-span-12">
              <Card>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  </div>
                  <h2 className="text-2xl font-black font-headline tracking-tight" style={{ color: '#111827' }}>Identity Verification</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Government ID Upload */}
                  <div className="flex flex-col gap-4">
                    <label style={labelStyle} className="text-[11px] font-black uppercase tracking-[0.2em] ml-1">Government ID (Aadhar/PAN)</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        id="gov-id" 
                        className="hidden" 
                        accept="image/*,.pdf"
                        disabled={!editing}
                        onChange={(e) => setGovIdName(e.target.files[0]?.name || '')}
                      />
                      <label 
                        htmlFor="gov-id"
                        className={`
                          flex flex-col items-center justify-center gap-3 w-full h-40 rounded-[2rem] border-2 border-dashed transition-all duration-300
                          ${editing ? 'border-primary/30 bg-primary/5 cursor-pointer hover:border-primary hover:bg-primary/10' : 'border-outline-variant/20 bg-surface-container opacity-50 cursor-not-allowed'}
                        `}
                      >
                        <span className={`material-symbols-outlined text-3xl ${govIdName ? 'text-success' : 'text-primary'}`}>
                          {govIdName ? 'check_circle' : 'upload_file'}
                        </span>
                        <div className="text-center px-4">
                          <p className="text-sm font-bold truncate max-w-[200px]" style={{ color: '#111827' }}>
                            {govIdName || 'Upload Govt ID'}
                          </p>
                          <p className="text-[10px] uppercase font-black tracking-widest mt-1" style={{ color: '#6b7280' }}>
                            {govIdName ? 'Click to change' : 'JPG, PNG or PDF (Max 5MB)'}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Passport Photo Upload */}
                  <div className="flex flex-col gap-4">
                    <label style={labelStyle} className="text-[11px] font-black uppercase tracking-[0.2em] ml-1">Passport Size Photo</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        id="passport-photo" 
                        className="hidden" 
                        accept="image/*"
                        disabled={!editing}
                        onChange={(e) => setPassportPhotoName(e.target.files[0]?.name || '')}
                      />
                      <label 
                        htmlFor="passport-photo"
                        className={`
                          flex flex-col items-center justify-center gap-3 w-full h-40 rounded-[2rem] border-2 border-dashed transition-all duration-300
                          ${editing ? 'border-primary/30 bg-primary/5 cursor-pointer hover:border-primary hover:bg-primary/10' : 'border-outline-variant/20 bg-surface-container opacity-50 cursor-not-allowed'}
                        `}
                      >
                        <span className={`material-symbols-outlined text-3xl ${passportPhotoName ? 'text-success' : 'text-primary'}`}>
                          {passportPhotoName ? 'check_circle' : 'add_a_photo'}
                        </span>
                        <div className="text-center px-4">
                          <p className="text-sm font-bold truncate max-w-[200px]" style={{ color: '#111827' }}>
                            {passportPhotoName || 'Upload Photo'}
                          </p>
                          <p className="text-[10px] uppercase font-black tracking-widest mt-1" style={{ color: '#6b7280' }}>
                            {passportPhotoName ? 'Click to change' : 'JPG or PNG (Max 2MB)'}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-2xl bg-primary/5 flex items-start gap-4 border border-primary/10">
                  <span className="material-symbols-outlined text-primary text-xl">info</span>
                  <p className="text-xs font-bold leading-relaxed" style={{ color: '#374151' }}>
                    Verification documents are encrypted and only used for identity validation. Verified workers receive a "Verified Badge" which increases booking chances by 60%.
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Full Width Security Section */}
          <div className="col-span-12">
            <Card>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <h2 className="text-2xl font-black font-headline tracking-tight" style={{ color: '#111827' }}>Security &amp; Privacy</h2>
              </div>

              {pwSaved && (
                <div className="bg-success/10 text-success rounded-2xl p-4 mb-8 flex items-center gap-3 border border-success/20 animate-page-fade-in">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <p className="text-xs font-black uppercase tracking-widest">Credentials updated and synchronized</p>
                </div>
              )}
              
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
