import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-6 py-3 rounded-full font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-br from-primary to-primary-dim text-white hover:shadow-atmospheric hover:-translate-y-0.5',
    secondary: 'bg-secondary-container text-secondary hover:bg-secondary/10',
    outline: 'bg-transparent border-2 border-primary/20 text-primary hover:border-primary/40',
    ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container-high',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;