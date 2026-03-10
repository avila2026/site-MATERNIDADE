
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { Product } from '../types';

interface CheckoutProps {
  items: Product[];
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-[#FFF1F2] animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#FDA4AF] hover:text-[#4C0519] transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Voltar para a Loja
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Form */}
          <div>
            <h1 className="text-3xl font-serif text-[#4C0519] mb-4">Checkout</h1>
            <p className="text-sm text-[#881337] mb-12">Este é um site de exemplo. A compra está desativada.</p>
            
            <div className="space-y-12">
              {/* Section 1: Contact */}
              <div>
                <h2 className="text-xl font-serif text-[#4C0519] mb-6">Informações de Contato</h2>
                <div className="space-y-4">
                   <input type="email" placeholder="Endereço de e-mail" className="w-full bg-transparent border-b border-[#FECDD3] py-3 text-[#4C0519] placeholder-[#FDA4AF] outline-none focus:border-[#4C0519] transition-colors cursor-not-allowed" disabled />
                   <div className="flex items-center gap-2">
                     <input type="checkbox" id="newsletter" className="accent-[#4C0519] cursor-not-allowed" disabled />
                     <label htmlFor="newsletter" className="text-sm text-[#881337] cursor-not-allowed">Enviar notícias e ofertas por e-mail</label>
                   </div>
                </div>
              </div>

              {/* Section 2: Shipping */}
              <div>
                <h2 className="text-xl font-serif text-[#4C0519] mb-6">Endereço de Entrega</h2>
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Nome" className="w-full bg-transparent border-b border-[#FECDD3] py-3 text-[#4C0519] placeholder-[#FDA4AF] outline-none focus:border-[#4C0519] transition-colors cursor-not-allowed" disabled />
                      <input type="text" placeholder="Sobrenome" className="w-full bg-transparent border-b border-[#FECDD3] py-3 text-[#4C0519] placeholder-[#FDA4AF] outline-none focus:border-[#4C0519] transition-colors cursor-not-allowed" disabled />
                   </div>
                   <input type="text" placeholder="Endereço" className="w-full bg-transparent border-b border-[#FECDD3] py-3 text-[#4C0519] placeholder-[#FDA4AF] outline-none focus:border-[#4C0519] transition-colors cursor-not-allowed" disabled />
                   <input type="text" placeholder="Apartamento, suíte, etc. (opcional)" className="w-full bg-transparent border-b border-[#FECDD3] py-3 text-[#4C0519] placeholder-[#FDA4AF] outline-none focus:border-[#4C0519] transition-colors cursor-not-allowed" disabled />
                   <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Cidade" className="w-full bg-transparent border-b border-[#FECDD3] py-3 text-[#4C0519] placeholder-[#FDA4AF] outline-none focus:border-[#4C0519] transition-colors cursor-not-allowed" disabled />
                      <input type="text" placeholder="CEP" className="w-full bg-transparent border-b border-[#FECDD3] py-3 text-[#4C0519] placeholder-[#FDA4AF] outline-none focus:border-[#4C0519] transition-colors cursor-not-allowed" disabled />
                   </div>
                </div>
              </div>

               {/* Section 3: Payment (Mock) */}
              <div>
                <h2 className="text-xl font-serif text-[#4C0519] mb-6">Pagamento</h2>
                <div className="p-6 border border-[#FECDD3] bg-white/50 space-y-4">
                   <p className="text-sm text-[#881337] mb-2">Todas as transações são seguras e criptografadas.</p>
                   <input type="text" placeholder="Número do cartão" className="w-full bg-transparent border-b border-[#FECDD3] py-3 text-[#4C0519] placeholder-[#FDA4AF] outline-none focus:border-[#4C0519] transition-colors cursor-not-allowed" disabled />
                   <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Validade (MM/AA)" className="w-full bg-transparent border-b border-[#FECDD3] py-3 text-[#4C0519] placeholder-[#FDA4AF] outline-none focus:border-[#4C0519] transition-colors cursor-not-allowed" disabled />
                      <input type="text" placeholder="Código de segurança" className="w-full bg-transparent border-b border-[#FECDD3] py-3 text-[#4C0519] placeholder-[#FDA4AF] outline-none focus:border-[#4C0519] transition-colors cursor-not-allowed" disabled />
                   </div>
                </div>
              </div>

              <div>
                <button 
                    disabled
                    className="w-full py-5 bg-[#FDA4AF] text-[#FFF1F2] uppercase tracking-widest text-sm font-medium cursor-not-allowed opacity-80"
                >
                    Pagar Agora — R$ {total}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:pl-12 lg:border-l border-[#FECDD3]">
            <h2 className="text-xl font-serif text-[#4C0519] mb-8">Resumo do Pedido</h2>
            
            <div className="space-y-6 mb-8">
               {items.map((item, idx) => (
                 <div key={idx} className="flex gap-4">
                    <div className="w-16 h-16 bg-[#FFE4E6] relative">
                       <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                       <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#4C0519] text-white text-[10px] flex items-center justify-center rounded-full">1</span>
                    </div>
                    <div className="flex-1">
                       <h3 className="font-serif text-[#4C0519] text-base">{item.name}</h3>
                       <p className="text-xs text-[#FDA4AF]">{item.category}</p>
                    </div>
                    <span className="text-sm text-[#881337]">R$ {item.price}</span>
                 </div>
               ))}
            </div>

            <div className="border-t border-[#FECDD3] pt-6 space-y-2">
              <div className="flex justify-between text-sm text-[#881337]">
                 <span>Subtotal</span>
                 <span>R$ {subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-[#881337]">
                 <span>Shipping</span>
                 <span>Grátis</span>
              </div>
            </div>
            
            <div className="border-t border-[#FECDD3] mt-6 pt-6">
               <div className="flex justify-between items-center">
                 <span className="font-serif text-xl text-[#4C0519]">Total</span>
                 <div className="flex items-end gap-2">
                   <span className="text-xs text-[#FDA4AF] mb-1">BRL</span>
                   <span className="font-serif text-2xl text-[#4C0519]">R$ {total}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;