import React from 'react';
import { Settings } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className="group flex flex-col gap-6 cursor-pointer" onClick={() => onClick(product)}>
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#FFE4E6]">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 sepia-[0.1]"
        />
        
        {/* Hover overlay with "Quick View" - minimalistic */}
        <div className="absolute inset-0 bg-[#4C0519]/0 group-hover:bg-[#4C0519]/5 transition-colors duration-500 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="bg-white/90 backdrop-blur text-[#4C0519] px-6 py-3 rounded-full text-xs uppercase tracking-widest font-medium">
                    Ver Detalhes
                </span>
            </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); /* Handle config if needed */ }}
          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <Settings size={16} />
        </button>
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-serif font-medium text-[#4C0519] mb-1 group-hover:opacity-70 transition-opacity">{product.name}</h3>
        <p className="text-sm font-light text-[#881337] mb-3 tracking-wide">{product.category}</p>
        <span className="text-sm font-medium text-[#4C0519] block">R$ {product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
