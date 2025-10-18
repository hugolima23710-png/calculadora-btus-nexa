import React from 'react';
import { Product } from '../types';
import { ShoppingCartIcon } from './icons';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col sm:flex-row items-center p-4 gap-4 transition-transform duration-300 hover:scale-102 hover:shadow-xl">
    <img src={product.imageUrl} alt={product.name} className="w-32 h-32 object-cover rounded-lg flex-shrink-0" />
    <div className="flex-1 text-center sm:text-left">
      <h3 className="font-bold text-lg text-slate-800">{product.name}</h3>
      <p className="text-sm text-slate-600 mt-1 mb-3">{product.description}</p>
      <a
        href={product.affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-5 py-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
      >
        Comprar com Desconto <ShoppingCartIcon />
      </a>
    </div>
  </div>
);