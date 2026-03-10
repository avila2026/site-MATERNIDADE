import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface AdminConfigProps {
  products: Product[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onAddProduct: (product: Product) => void;
}

const ProductListItem: React.FC<{ product: Product; onClick: (p: Product) => void }> = ({ product, onClick }) => (
  <div 
    onClick={() => onClick(product)}
    className="flex items-center gap-6 bg-white p-4 rounded-xl border border-[#D6D1C7]/30 hover:border-[#2C2A26] transition-all cursor-pointer group"
  >
    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#F5F2EB]">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="flex-grow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-serif text-[#2C2A26] text-lg">{product.name}</h3>
          <p className="text-xs uppercase tracking-widest text-[#A8A29E]">{product.category}</p>
        </div>
        <p className="font-medium text-[#2C2A26]">R$ {product.price.toLocaleString('pt-BR')}</p>
      </div>
      <p className="text-sm text-[#5D5A53] line-clamp-1 mt-1">{product.description}</p>
    </div>
  </div>
);

const AdminConfig: React.FC<AdminConfigProps> = ({ products, onBack, onProductClick, onAddProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<Product['category']>('Quarto');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price || !imageUrl) return;

    const newProduct: Product = {
      id: `p${Date.now()}`,
      name,
      tagline: 'Novidade',
      description,
      longDescription: description,
      price: parseFloat(price),
      category,
      imageUrl,
      features: ['Novo Produto']
    };

    onAddProduct(newProduct);
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
  };

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 bg-[#F5F2EB] min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        <button onClick={onBack} className="mb-8 text-[#5D5A53] hover:text-[#2C2A26] transition-colors">
          ← Voltar para Home
        </button>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Form Section */}
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-serif text-[#2C2A26] mb-8">Adicionar Novo Produto</h2>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-[#D6D1C7]/30">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2">Nome</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F5F2EB] border-none rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#2C2A26] transition-all"
                  placeholder="Ex: Berço de Luxo"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2">Descrição</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#F5F2EB] border-none rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#2C2A26] transition-all h-32"
                  placeholder="Descreva o produto..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2">Preço (R$)</label>
                  <input 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#F5F2EB] border-none rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#2C2A26] transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2">Categoria</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value as Product['category'])}
                    className="w-full bg-[#F5F2EB] border-none rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#2C2A26] transition-all"
                  >
                    <option value="Quarto">Quarto</option>
                    <option value="Vestuário">Vestuário</option>
                    <option value="Passeio">Passeio</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Acessórios">Acessórios</option>
                    <option value="Brinquedos">Brinquedos</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2">URL da Imagem</label>
                <input 
                  type="text" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-[#F5F2EB] border-none rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#2C2A26] transition-all"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#2C2A26] text-white py-4 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-[#4A4741] transition-colors mt-4"
              >
                Adicionar Produto
              </button>
            </form>
          </div>

          {/* List Section */}
          <div className="lg:w-2/3">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-4xl font-serif text-[#2C2A26]">Produtos Atuais</h1>
              
              {/* View Toggle */}
              <div className="flex bg-white rounded-full p-1 border border-[#D6D1C7]/30">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-[#2C2A26] text-white' : 'text-[#A8A29E] hover:text-[#2C2A26]'}`}
                  title="Visualização em Grid"
                >
                  <LayoutGrid size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-[#2C2A26] text-white' : 'text-[#A8A29E] hover:text-[#2C2A26]'}`}
                  title="Visualização em Lista"
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} onClick={onProductClick} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map(product => (
                  <ProductListItem key={product.id} product={product} onClick={onProductClick} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminConfig;
