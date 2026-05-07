import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

function CheckCircle({ selected }) {
  return (
    <span
      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
        selected ? 'border-accent bg-accent' : 'border-border'
      }`}
    >
      {selected && (
        <CheckIcon className="w-3 h-3 text-white" strokeWidth={3} />
      )}
    </span>
  );
}

function SelectableCard({ label, description, icon, selected, onClick }) {
  const isDetailed = !!(icon || description);

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'text-left w-full rounded-xl border transition-all duration-150 flex items-center gap-3',
        isDetailed ? 'px-5 py-4' : 'px-4 py-3 text-sm font-medium',
        selected
          ? 'border-accent-text bg-accent-subtle text-accent-text'
          : 'border-border text-secondary hover:border-border-focus',
      ].join(' ')}
    >
      {isDetailed ? (
        <>
          {icon && (
            <span className={`flex-shrink-0 ${selected ? 'text-accent' : 'text-muted'}`}>
              {icon}
            </span>
          )}
          <div className="flex-1 min-w-0">
            <p className={`font-semibold text-sm ${selected ? 'text-accent-text' : 'text-secondary'}`}>
              {label}
            </p>
            {description && (
              <p className={`text-xs mt-0.5 font-normal ${selected ? 'text-accent' : 'text-muted'}`}>
                {description}
              </p>
            )}
          </div>
          <CheckCircle selected={selected} />
        </>
      ) : (
        <>
          <CheckCircle selected={selected} />
          {label}
        </>
      )}
    </button>
  );
}

export default SelectableCard;
