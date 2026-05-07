import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import Button from '../shared/Button';

const CATEGORY_STYLES = {
  'Vendas': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  'Marketing': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
  'Omnichannel': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
  'Uso de Inteligência Artificial': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
};

function RecommendationList({ recommendations, onReset }) {
  return (
    <div className="bg-surface rounded-lg border border-border p-8 transition-colors duration-300">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-primary">Suas Recomendações</h2>
          <p className="text-sm text-muted mt-1">
            {recommendations.length} produto{recommendations.length !== 1 ? 's' : ''} encontrado{recommendations.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button variant="ghost" onClick={onReset} className="flex-shrink-0">
          Nova busca
        </Button>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-secondary font-medium">Nenhum produto encontrado</p>
          <p className="text-muted text-sm mt-1">Tente selecionar outras preferências ou funcionalidades</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {recommendations.map((rec, index) => (
            <div
              key={rec.id}
              className={`rounded-lg border p-5 transition-all border-border relative`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${CATEGORY_STYLES[rec.category] || 'bg-surface-hover text-secondary'}`}>
                      {rec.category}
                    </span>
                  </div>
                  <h3 className={`text-base font-bold text-primary`}>
                    {rec.name}
                  </h3>
                </div>
                {index === 0 && (
                    <span className="absolute top-0 right-0 rounded-tr-lg rounded-bl-lg text-xs font-bold bg-accent text-white px-4 py-2">
                      <StarIcon className="w-4 h-4 text-white" />
                    </span>
                  )}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {rec.features.map((f, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2.5 py-1 rounded-full bg-surface-hover text-secondary`}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecommendationList;
