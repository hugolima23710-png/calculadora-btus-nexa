import React from 'react';

interface ResultDisplayProps {
  btu: number | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ btu }) => {
  if (btu === null) {
    return null;
  }

  return (
    <div className="my-8 bg-white p-6 rounded-2xl shadow-lg text-center border-t-4 border-blue-500">
      <p className="text-slate-600 text-lg">🔹 Seu ambiente precisa de aproximadamente</p>
      <p className="text-4xl sm:text-5xl font-bold text-blue-600 my-2">
        {btu.toLocaleString('pt-BR')} BTUs
      </p>
       <p className="text-slate-500 text-sm max-w-md mx-auto">
        Com base nas suas informações, calculamos a capacidade ideal para garantir conforto e eficiência.
      </p>
    </div>
  );
};