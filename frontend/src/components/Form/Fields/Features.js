import React, { useState } from 'react';
import SelectableCard from '../../shared/SelectableCard';

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [current, setCurrent] = useState(selectedFeatures);

  const handleToggle = (feat) => {
    const updated = current.includes(feat)
      ? current.filter((f) => f !== feat)
      : [...current, feat];
    setCurrent(updated);
    onFeatureChange(updated);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-primary mb-1">Funcionalidades</h2>
      <p className="text-sm text-muted mb-5">Quais recursos você precisa no dia a dia?</p>
      <div className="flex flex-col gap-3">
        {features.map((feat, i) => (
          <SelectableCard
            key={i}
            label={feat}
            selected={current.includes(feat)}
            onClick={() => handleToggle(feat)}
          />
        ))}
      </div>
    </div>
  );
}

export default Features;
