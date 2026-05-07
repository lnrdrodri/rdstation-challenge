import React from 'react';
import { SparklesIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import SelectableCard from '../../shared/SelectableCard';

const OPTIONS = [
  {
    value: 'SingleProduct',
    label: 'Produto Único',
    description: 'Receba a recomendação do produto que melhor se encaixa no seu perfil.',
    icon: <SparklesIcon className="w-6 h-6" />,
  },
  {
    value: 'MultipleProducts',
    label: 'Múltiplos Produtos',
    description: 'Veja todos os produtos que atendem às suas necessidades, ranqueados por relevância.',
    icon: <ListBulletIcon className="w-6 h-6" />,
  },
];

function RecommendationType({ selected, onRecommendationTypeChange }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-primary mb-1">Tipo de Recomendação</h2>
      <p className="text-sm text-muted mb-5">Como você prefere receber as sugestões?</p>
      <div className="flex flex-col gap-4">
        {OPTIONS.map((opt) => (
          <SelectableCard
            key={opt.value}
            label={opt.label}
            description={opt.description}
            icon={opt.icon}
            selected={selected === opt.value}
            onClick={() => onRecommendationTypeChange(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendationType;
