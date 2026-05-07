import React, { useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useDarkMode } from './hooks/useDarkMode';
import Button from './components/shared/Button';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState(null);
  const [dark, setDark] = useDarkMode();

  const handleSubmit = (data) => {
    setRecommendations(data);
  };

  const handleReset = () => {
    setRecommendations(null);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-xl">
        <div className="fixed top-4 right-4">
          <Button variant="icon" onClick={() => setDark(!dark)} aria-label="Alternar tema">
            {dark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary">Recomendador de Produtos</h1>
          <p className="text-secondary text-sm mt-1">Encontre a solução ideal para o seu negócio</p>
        </div>

        {recommendations === null ? (
          <Form onSubmit={handleSubmit} />
        ) : (
          <RecommendationList recommendations={recommendations} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}

export default App;
