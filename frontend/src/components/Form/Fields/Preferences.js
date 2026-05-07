import React, { useState } from 'react';
import SelectableCard from '../../shared/SelectableCard';

function Preferences({ preferences, selectedPreferences = [], onPreferenceChange }) {
  const [current, setCurrent] = useState(selectedPreferences);

  const handleToggle = (pref) => {
    const updated = current.includes(pref)
      ? current.filter((p) => p !== pref)
      : [...current, pref];
    setCurrent(updated);
    onPreferenceChange(updated);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-primary mb-1">Preferências</h2>
      <p className="text-sm text-muted mb-5">Selecione o que é mais importante para o seu negócio</p>
      <div className="flex flex-col gap-3">
        {preferences.map((pref, i) => (
          <SelectableCard
            key={i}
            label={pref}
            selected={current.includes(pref)}
            onClick={() => handleToggle(pref)}
          />
        ))}
      </div>
    </div>
  );
}

export default Preferences;
