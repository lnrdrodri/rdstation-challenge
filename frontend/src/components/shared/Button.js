import React from 'react';

const VARIANTS = {
  primary: 'px-6 py-2 bg-accent border-b-2 border-black text-black font-semibold hover:bg-accent-hover disabled:opacity-50',
  ghost:   'px-4 py-2 text-secondary hover:bg-surface-hover disabled:opacity-30',
  icon:    'p-2 rounded-xl border border-border bg-surface text-secondary hover:bg-surface-hover',
};

function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button
      type="button"
      className={['text-sm font-medium transition disabled:cursor-not-allowed', VARIANTS[variant], className].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
