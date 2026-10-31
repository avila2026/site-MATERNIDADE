/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  // Mock sizes for demonstration if not in data
  const sizes = ['S', 'M', 'L'];
  const showSizes = product.category === 'Vestuário';

  return (
    <div className="pt-24 min-h-screen bg-[#FFF1F2] animate-fade-in-up">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#FDA4AF] hover:text-[#4C0519] transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Voltar para a Loja
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left: Main Image Only */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-[#FFE4E6] overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover animate-fade-in-up"
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center max-w-xl">
             <span className="text-sm font-medium text-[#FDA4AF] uppercase tracking-widest mb-2">{product.category}</span>
             <h1 className="text-4xl md:text-5xl font-serif text-[#4C0519] mb-4">{product.name}</h1>
             <span className="text-2xl font-light text-[#4C0519] mb-8">R$ {product.price.toLocaleString('pt-BR')}</span>
             
             <p className="text-[#881337] leading-relaxed font-light text-lg mb-8 border-b border-[#FECDD3] pb-8">
               {product.longDescription || product.description}
             </p>

             {showSizes && (
                <div className="mb-8">
                  <span className="block text-xs font-bold uppercase tracking-widest text-[#4C0519] mb-4">Selecione o Tamanho</span>
                  <div className="flex gap-4">
                    {sizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
                          selectedSize === size 
                            ? 'border-[#4C0519] bg-[#4C0519] text-[#FFF1F2]' 
                            : 'border-[#FECDD3] text-[#881337] hover:border-[#4C0519]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
             )}

             <div className="flex flex-col gap-4">
               <button 
                 onClick={() => onAddToCart(product)}
                 className="w-full py-5 bg-[#4C0519] text-[#FFF1F2] uppercase tracking-widest text-sm font-medium hover:bg-[#881337] transition-colors"
               >
                 Adicionar ao Carrinho — R$ {product.price.toLocaleString('pt-BR')}
               </button>
               <ul className="mt-8 space-y-2 text-sm text-[#881337]">
                 {product.features.map((feature, idx) => (
                   <li key={idx} className="flex items-center gap-3">
                     <span className="w-1 h-1 bg-[#4C0519] rounded-full"></span>
                     {feature}
                   </li>
                 ))}
               </ul>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
