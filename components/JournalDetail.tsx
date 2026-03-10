/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { JournalArticle } from '../types';

interface JournalDetailProps {
  article: JournalArticle;
  onBack: () => void;
}

const JournalDetail: React.FC<JournalDetailProps> = ({ article, onBack }) => {
  return (
    <div className="min-h-screen bg-[#FFF1F2] animate-fade-in-up">
       {/* Hero Image for Article - Full bleed to top so navbar sits on it */}
       <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden">
          <img 
             src={article.image} 
             alt={article.title} 
             className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
       </div>

       <div className="max-w-3xl mx-auto px-6 md:px-12 -mt-32 relative z-10 pb-32">
          <div className="bg-[#FFF1F2] p-8 md:p-16 shadow-xl shadow-[#4C0519]/5">
             <div className="flex justify-between items-center mb-12 border-b border-[#FECDD3] pb-8">
                <button 
                  onClick={onBack}
                  className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#FDA4AF] hover:text-[#4C0519] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Voltar para o Diário
                </button>
                <span className="text-xs font-medium uppercase tracking-widest text-[#FDA4AF]">{article.date}</span>
             </div>

             <h1 className="text-4xl md:text-6xl font-serif text-[#4C0519] mb-12 leading-tight text-center">
               {article.title}
             </h1>

             <div className="prose prose-rose prose-lg mx-auto font-light leading-loose text-[#881337]">
               {article.content}
             </div>
             
             <div className="mt-16 pt-12 border-t border-[#FECDD3] flex justify-center">
                  <span className="text-2xl font-serif italic text-[#4C0519]">Achadinhos Maternidade</span>
             </div>
          </div>
       </div>
    </div>
  );
};

export default JournalDetail;
