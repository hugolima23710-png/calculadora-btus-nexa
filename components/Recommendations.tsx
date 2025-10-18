import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface RecommendationsProps {
  products: Product[];
}

export const Recommendations: React.FC<RecommendationsProps> = ({ products }) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
        ✅ Modelos recomendados para você
      </h2>
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard key={product.btu} product={product} />
        ))}
      </div>
    </div>
  );
};