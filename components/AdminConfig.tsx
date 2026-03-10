import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import ProductCard from './ProductCard';
import ImageGenerator from './ImageGenerator';
import { Product } from '../types';

interface AdminConfigProps {
  products: Product[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
}

const ProductListItem: React.FC<{ product: Product; onClick: (p: Product) => void }> = ({ product, onClick }) => (
  <div 
    onClick={() => onClick(product)}
    className="flex items-center gap-6 bg-white p-4 rounded-xl border border-[#FECDD3]/30 hover:border-[#4C0519] transition-all cursor-pointer group"
  >
    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#FFF1F2]">
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
          <h3 className="font-serif text-[#4C0519] text-lg">{product.name}</h3>
          <p className="text-xs uppercase tracking-widest text-[#FDA4AF]">{product.category}</p>
        </div>
        <p className="font-medium text-[#4C0519]">R$ {product.price.toLocaleString('pt-BR')}</p>
      </div>
      <p className="text-sm text-[#881337] line-clamp-1 mt-1">{product.description}</p>
    </div>
  </div>
);

const AdminConfig: React.FC<AdminConfigProps> = ({ products, onBack, onProductClick, onAddProduct, onUpdateProduct }) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<Product['category']>('Quarto');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setImageUrl(product.imageUrl);
    setCategory(product.category);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price || !imageUrl) return;

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name,
        description,
        price: parseFloat(price),
        category,
        imageUrl,
      });
      setEditingProduct(null);
    } else {
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
    }
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
  };

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 bg-[#FFF1F2] min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        <button onClick={onBack} className="mb-8 text-[#881337] hover:text-[#4C0519] transition-colors">
          ← Voltar para Home
        </button>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Form Section */}
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-serif text-[#4C0519] mb-8">{editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-[#FECDD3]/30">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#881337] mb-2">Nome</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FFF1F2] border-none rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#4C0519] transition-all"
                  placeholder="Ex: Berço de Luxo"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#881337] mb-2">Descrição</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#FFF1F2] border-none rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#4C0519] transition-all h-32"
                  placeholder="Descreva o produto..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#881337] mb-2">Preço (R$)</label>
                  <input 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#FFF1F2] border-none rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#4C0519] transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#881337] mb-2">Categoria</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value as Product['category'])}
                    className="w-full bg-[#FFF1F2] border-none rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#4C0519] transition-all"
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
                <label className="block text-xs uppercase tracking-widest text-[#881337] mb-2">URL da Imagem</label>
                <input 
                  type="text" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-[#FFF1F2] border-none rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#4C0519] transition-all"
                  placeholder="https://images.unsplash.com/..."
                />
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-widest text-[#881337] mb-2">Ou gere uma imagem:</p>
                  <ImageGenerator onImageGenerated={setImageUrl} />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-[#4C0519] text-white py-4 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-[#881337] transition-colors mt-4"
              >
                {editingProduct ? 'Atualizar Produto' : 'Adicionar Produto'}
              </button>
              {editingProduct && (
                <button 
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setName('');
                    setDescription('');
                    setPrice('');
                    setImageUrl('');
                  }}
                  className="w-full bg-[#FDA4AF] text-white py-4 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-[#F4C2C2] transition-colors mt-2"
                >
                  Cancelar
                </button>
              )}
            </form>
          </div>

          {/* List Section */}
          <div className="lg:w-2/3">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-4xl font-serif text-[#4C0519]">Produtos Atuais</h1>
              
              {/* View Toggle */}
              <div className="flex bg-white rounded-full p-1 border border-[#FECDD3]/30">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-[#4C0519] text-white' : 'text-[#FDA4AF] hover:text-[#4C0519]'}`}
                  title="Visualização em Grid"
                >
                  <LayoutGrid size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-[#4C0519] text-white' : 'text-[#FDA4AF] hover:text-[#4C0519]'}`}
                  title="Visualização em Lista"
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
                {products.map(product => (
                  <div key={product.id} className="relative group">
                    <ProductCard product={product} onClick={onProductClick} />
                    <button 
                      onClick={() => startEdit(product)}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Editar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4C0519]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
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
