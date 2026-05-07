import React, { useState } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import Button from '../shared/Button';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

const STEPS = ['Preferências', 'Funcionalidades', 'Tipo'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center mb-8">
      {STEPS.map((label, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center shrink-0 w-1/3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                i < current
                  ? 'bg-accent text-black'
                  : i === current
                  ? 'bg-accent text-black ring-4 ring-accent-subtle'
                  : 'bg-surface text-muted border border-border'
              }`}
            >
              {i < current ? '✓' : i + 1}
            </div>
            <span
              className={`text-xs mt-1.5 font-medium text-center w-20 transition-colors ${
                i === current
                  ? 'text-primary'
                  : i < current
                  ? 'text-secondary'
                  : 'text-muted'
              }`}
            >
              {label}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function Form({ onSubmit }) {
  const [step, setStep] = useState(0);
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });
  const { getRecommendations } = useRecommendations(products);

  const isLastStep = step === STEPS.length - 1;

  const canAdvance =
    (step === 0 && formData.selectedPreferences.length > 0) ||
    (step === 1 && formData.selectedFeatures.length > 0) ||
    step === 2;

  const canSubmit =
    (formData.selectedPreferences.length > 0 || formData.selectedFeatures.length > 0) &&
    formData.selectedRecommendationType !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    const data = getRecommendations(formData);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-lg border border-border p-8 transition-colors duration-300">
      <StepIndicator current={step} />

      <div className="min-h-80">
        {step === 0 && (
          <Preferences
            preferences={preferences}
            selectedPreferences={formData.selectedPreferences}
            onPreferenceChange={(selected) => handleChange('selectedPreferences', selected)}
          />
        )}
        {step === 1 && (
          <Features
            features={features}
            selectedFeatures={formData.selectedFeatures}
            onFeatureChange={(selected) => handleChange('selectedFeatures', selected)}
          />
        )}
        {step === 2 && (
          <RecommendationType
            selected={formData.selectedRecommendationType}
            onRecommendationTypeChange={(selected) =>
              handleChange('selectedRecommendationType', selected)
            }
          />
        )}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0}>
          Anterior
        </Button>

        {!isLastStep ? (
          <Button key="next" onClick={() => setStep((s) => s + 1)} disabled={!canAdvance}>
            Próximo
          </Button>
        ) : (
          <Button key="submit" type="submit" disabled={!canSubmit}>
            Ver Recomendações
          </Button>
        )}
      </div>
    </form>
  );
}

export default Form;
