import React from 'react';

const Input = ({
  label,
  id,
  error,
  icon,
  type = 'text',
  className = '',
  as: Tag = 'input',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {label && (
        <label htmlFor={id} style={{ color: '#374151' }} className="text-[11px] font-black uppercase tracking-[0.2em] ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <span className="material-symbols-outlined text-xl group-focus-within:text-primary transition-all duration-300" style={{ color: '#6b7280' }}>
              {icon}
            </span>
          </div>
        )}
        <Tag
          id={id}
          type={type}
          className={`
            w-full bg-surface-container border-none rounded-[1.5rem] py-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300
            ${icon ? 'pl-14 pr-6' : 'px-6'}
            ${error ? 'bg-error/5 ring-1 ring-error/20' : ''}
            ${props.disabled ? 'opacity-50 grayscale cursor-not-allowed' : ''}
            ${Tag === 'textarea' ? 'resize-none min-h-[120px]' : ''}
          `}
          style={{ color: '#1f2937', caretColor: 'var(--color-primary)' }}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[10px] text-error font-black uppercase tracking-wider mt-1 ml-4 animate-page-fade-in flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
