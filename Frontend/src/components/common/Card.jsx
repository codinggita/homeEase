import React from 'react';

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div 
      className={`bg-surface-container-low rounded-xl p-6 transition-all ${
        hover ? 'hover:bg-surface-container-highest hover:shadow-atmospheric hover:-translate-y-1' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;