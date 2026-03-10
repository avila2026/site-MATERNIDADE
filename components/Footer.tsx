/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick, onAdminClick }) => {
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribeStatus('loading');
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-[#FFE4E6] pt-24 pb-12 px-6 text-[#881337]">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        
        <div className="md:col-span-4">
          <h4 className="text-2xl font-serif text-[#4C0519] mb-6">Achadinhos Maternidade</h4>
          <p className="max-w-xs font-light leading-relaxed">
            Projetando tecnologia que parece tão natural quanto o mundo ao seu redor.
            Nascido da terra, construído para a mente.
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-medium text-[#4C0519] mb-6 tracking-wide text-sm uppercase">Loja</h4>
          <ul className="space-y-4 font-light">
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-[#4C0519] transition-colors underline-offset-4 hover:underline">Todos os Produtos</a></li>
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-[#4C0519] transition-colors underline-offset-4 hover:underline">Novidades</a></li>
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-[#4C0519] transition-colors underline-offset-4 hover:underline">Áudio</a></li>
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-[#4C0519] transition-colors underline-offset-4 hover:underline">Casa</a></li>
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-medium text-[#4C0519] mb-6 tracking-wide text-sm uppercase">Empresa</h4>
          <ul className="space-y-4 font-light">
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-[#4C0519] transition-colors underline-offset-4 hover:underline">Nossa História</a></li>
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-[#4C0519] transition-colors underline-offset-4 hover:underline">Sustentabilidade</a></li>
            <li><a href="#journal" onClick={(e) => onLinkClick(e, 'journal')} className="hover:text-[#4C0519] transition-colors underline-offset-4 hover:underline">Diário</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-medium text-[#4C0519] mb-6 tracking-wide text-sm uppercase">Boletim Informativo</h4>
          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="email@endereco.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              className="bg-transparent border-b border-[#FDA4AF] py-2 text-lg outline-none focus:border-[#4C0519] transition-colors placeholder-[#FDA4AF]/70 text-[#4C0519] disabled:opacity-50" 
            />
            <button 
              onClick={handleSubscribe}
              disabled={subscribeStatus !== 'idle' || !email}
              className="self-start text-sm font-medium uppercase tracking-widest mt-2 hover:text-[#4C0519] disabled:cursor-default disabled:hover:text-[#881337] disabled:opacity-50 transition-opacity"
            >
              {subscribeStatus === 'idle' && 'Inscrever-se'}
              {subscribeStatus === 'loading' && 'Inscrevendo...'}
              {subscribeStatus === 'success' && 'Inscrito'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto mt-20 pt-8 border-t border-[#FECDD3] flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest opacity-60">
        <p>Created by @chanelluuh</p>
        <button onClick={onAdminClick} className="hover:text-[#4C0519] transition-colors">Configuração</button>
      </div>
    </footer>
  );
};

export default Footer;
