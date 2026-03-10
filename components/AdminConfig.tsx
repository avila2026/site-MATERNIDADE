import React from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface AdminConfigProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

const AdminConfig: React.FC<AdminConfigProps> = ({ onBack, onProductClick }) => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 bg-[#F5F2EB] min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        <button onClick={onBack} className="mb-8 text-[#5D5A53] hover:text-[#2C2A26] transition-colors">
          ← Voltar para Home
        </button>
        <h1 className="text-4xl font-serif text-[#2C2A26] mb-12">Configuração de Produtos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminConfig;
