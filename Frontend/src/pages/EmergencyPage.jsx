import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import StepProgress from '../components/StepProgress';
import ServiceCard from '../components/ServiceCard';
import WorkSizeSelector from '../components/WorkSizeSelector';
import PriceCard from '../components/PriceCard';
import Button from '../components/Button';
import Input from '../components/Input';

const EMERGENCY_SERVICES = [
  {
    id: 'cleaning',    title: 'Cleaning',    icon: 'cleaning_services', description: 'Urgent home cleaning',
    workTypes: ['Utensils', 'Floor Cleaning', 'Full House', 'Other'],
  },
  {
    id: 'cooking',     title: 'Cooking',     icon: 'restaurant',        description: 'Emergency meal preparation',
    workTypes: ['Quick Meal', 'Party Cook', 'Daily Meals', 'Other'],
  },
  {
    id: 'babysitting', title: 'Babysitting', icon: 'child_care',        description: 'Immediate childcare',
    workTypes: ['Infant Care', 'Toddler', 'School-age', 'Other'],
  },
  {
    id: 'plumbing',    title: 'Plumbing',    icon: 'plumbing',          description: 'Urgent pipe / drain fix',
    workTypes: ['Leakage', 'Installation', 'Blockage', 'Other'],
  },
  {
    id: 'electrician', title: 'Electrician', icon: 'electrical_services', description: 'Electrical emergency',
    workTypes: ['Wiring', 'Switch Repair', 'Appliance Issue', 'Other'],
  },
  {
    id: 'ac_repair',   title: 'AC Repair',   icon: 'ac_unit',           description: 'Emergency AC service',
    workTypes: ['Not Cooling', 'Noise', 'Leaking', 'Other'],
  },
];

const EmergencyPage = () => {
  const navigate = useNavigate();
  const [service,  setService]  = useState(null);
  const [workType, setWorkType] = useState('');
  const [workSize, setWorkSize] = useState('');
  const [address,  setAddress]  = useState('');
  const [notes,    setNotes]    = useState('');
  const [errors,   setErrors]   = useState({});

  const handleServiceSelect = (svc) => {
    setService(svc);
    setWorkType('');
    setErrors({});
  };

  const validate = () => {
    const e = {};
    if (!service)          e.service  = 'Please select a service';
    if (!workType)         e.workType = 'Please select a work type';
    if (!workSize)         e.workSize = 'Please select work size';
    if (!address.trim() || address.trim().length < 5) e.address = 'Please enter a valid address';
    return e;
  };

  const handleContinue = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const state = { service: service.title, serviceId: service.id, workType, workSize, address, notes };
    localStorage.setItem('emergency_booking', JSON.stringify(state));
    navigate('/emergency-worker');
  };

  const isFormValid = service && workType && workSize && address.trim().length >= 5;

  return (
    <DashboardLayout activeRoute="booking">
      <StepProgress currentStep={1} />

      <div className="max-w-5xl mx-auto px-4 py-8 animate-page-fade-in space-y-8">
        {/* Emergency Banner */}
        <div className="flex items-center gap-4 bg-error-container/20 border border-error-container/40 rounded-2xl px-6 py-4">
          <span className="material-symbols-outlined text-error-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          <div>
            <h1 className="text-2xl font-extrabold text-on-surface font-headline">Emergency Booking</h1>
            <p className="text-sm text-on-surface-variant">Worker will be dispatched within 30–60 minutes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Form */}
          <div className="lg:col-span-2 space-y-6">

            {/* Step 1: Service */}
            <div className="bg-surface-container-low rounded-[2rem] p-8 space-y-6">
              <p className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4">Step 1 — Choose Service</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {EMERGENCY_SERVICES.map((svc) => (
                  <ServiceCard
                    key={svc.id}
                    service={svc}
                    isSelected={service?.id === svc.id}
                    onSelect={handleServiceSelect}
                  />
                ))}
              </div>
              {errors.service && <p className="text-[10px] text-error font-black uppercase tracking-wider mt-2 ml-2">{errors.service}</p>}
            </div>

            {/* Step 2: Work Type */}
            {service && (
              <div className="bg-surface-container-low rounded-[2rem] p-8 space-y-6 animate-page-fade-in">
                <p className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4">Step 2 — Work Type</p>
                <div className="flex flex-wrap gap-3">
                  {service.workTypes.map((wt) => (
                    <button
                      key={wt}
                      type="button"
                      onClick={() => { setWorkType(wt); setErrors(p => ({ ...p, workType: undefined })); }}
                      className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                        workType === wt
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
                      }`}
                    >
                      {wt}
                    </button>
                  ))}
                </div>
                {errors.workType && <p className="text-[10px] text-error font-black uppercase tracking-wider mt-2 ml-2">{errors.workType}</p>}
              </div>
            )}

            {/* Step 3: Work Size */}
            <div className="bg-surface-container-low rounded-[2rem] p-8 space-y-6">
              <p className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4">Step 3 — Work Size</p>
              <WorkSizeSelector value={workSize} onChange={(v) => { setWorkSize(v); setErrors(p => ({ ...p, workSize: undefined })); }} />
              <div className="bg-surface-container/50 p-4 rounded-2xl border border-outline-variant/10">
                <p className="text-xs text-on-surface-variant font-bold leading-relaxed">
                  <span className="text-primary mr-1">NOTE:</span> Select as per actual need. Extra work charges may be applied by the worker if mismatch occurs.
                </p>
              </div>
              {errors.workSize && <p className="text-[10px] text-error font-black uppercase tracking-wider mt-2 ml-2">{errors.workSize}</p>}
            </div>

            {/* Step 4: Address & Notes */}
            <div className="bg-surface-container-low rounded-[2rem] p-8 space-y-8">
              <p className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2">Step 4 — Location</p>
              <Input
                id="em-address"
                label="Your Address"
                icon="location_on"
                placeholder="Enter your full address"
                value={address}
                onChange={(e) => { setAddress(e.target.value); setErrors(p => ({ ...p, address: undefined })); }}
                error={errors.address}
              />
              <Input
                id="em-notes"
                label="Notes (optional)"
                as="textarea"
                rows={3}
                placeholder="Any specific instructions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button icon="arrow_forward" iconPosition="right" disabled={!isFormValid} onClick={handleContinue} size="lg">
                See Price & Continue
              </Button>
            </div>
          </div>

          {/* RIGHT: Live Price Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <PriceCard
                service={service?.title}
                workType={workType}
                workSize={workSize}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmergencyPage;
